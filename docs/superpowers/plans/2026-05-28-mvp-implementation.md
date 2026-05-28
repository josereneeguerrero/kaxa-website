# MVP Finanzas Honduras — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir app Flutter offline-first de control de gastos para negociante informal hondureño — 5 pantallas, multi-moneda HNL/USD, bolsillos de dinero, sin login.

**Architecture:** Offline-first con Drift (SQLite) como única fuente de verdad. Estado reactivo con Riverpod. UI en Flutter con navegación bottom nav. Sin internet requerido.

**Tech Stack:** Flutter 3.x · Drift 2.x (SQLite) · flutter_riverpod 2.x · fl_chart 0.68 · shared_preferences · uuid · intl

---

## Mapa de Archivos

```
mi_caja/
├── pubspec.yaml
├── analysis_options.yaml
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── core/
│   │   ├── database/
│   │   │   ├── app_database.dart          # Drift DB + tablas
│   │   │   ├── app_database.g.dart        # Generado (build_runner)
│   │   │   ├── daos/
│   │   │   │   ├── movimientos_dao.dart
│   │   │   │   └── categorias_dao.dart
│   │   │   └── seed_data.dart             # Categorías default
│   │   ├── models/
│   │   │   ├── enums.dart                 # TipoMovimiento, Moneda, MetodoPago
│   │   │   └── balance.dart               # BalanceBolsillo value object
│   │   └── providers/
│   │       ├── database_provider.dart
│   │       ├── movimientos_provider.dart
│   │       ├── categorias_provider.dart
│   │       ├── balance_provider.dart
│   │       └── settings_provider.dart
│   ├── features/
│   │   ├── home/
│   │   │   ├── home_screen.dart
│   │   │   └── widgets/
│   │   │       ├── balance_card.dart
│   │   │       └── bolsillos_row.dart
│   │   ├── agregar/
│   │   │   ├── agregar_screen.dart
│   │   │   └── widgets/
│   │   │       ├── monto_input.dart
│   │   │       ├── moneda_toggle.dart
│   │   │       ├── categoria_grid.dart
│   │   │       └── metodo_selector.dart
│   │   ├── historial/
│   │   │   ├── historial_screen.dart
│   │   │   └── widgets/
│   │   │       ├── movimiento_tile.dart
│   │   │       └── filtro_chips.dart
│   │   ├── resumen/
│   │   │   ├── resumen_screen.dart
│   │   │   └── widgets/
│   │   │       ├── dona_chart.dart
│   │   │       └── periodo_selector.dart
│   │   └── ajustes/
│   │       ├── ajustes_screen.dart
│   │       └── widgets/
│   │           └── categoria_form.dart
│   └── shared/
│       ├── theme.dart
│       ├── formatters.dart               # formatHNL(), formatUSD()
│       └── widgets/
│           └── app_scaffold.dart
├── test/
│   ├── core/
│   │   ├── daos/
│   │   │   ├── movimientos_dao_test.dart
│   │   │   └── categorias_dao_test.dart
│   │   └── providers/
│   │       └── balance_provider_test.dart
│   └── helpers/
│       └── test_database.dart            # DB en memoria para tests
```

---

## Task 1: Crear proyecto Flutter + pubspec.yaml

**Files:**
- Create: `mi_caja/pubspec.yaml`
- Create: `mi_caja/analysis_options.yaml`

- [ ] **Step 1: Crear proyecto Flutter**

```bash
flutter create mi_caja --org com.tucaja --platforms android,ios
cd mi_caja
```

Expected: proyecto creado con estructura estándar Flutter.

- [ ] **Step 2: Reemplazar pubspec.yaml con dependencias correctas**

```yaml
name: mi_caja
description: Tu caja en el bolsillo — control de gastos para Honduras
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.3.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  # Base de datos
  drift: ^2.18.0
  sqlite3_flutter_libs: ^0.5.24
  path_provider: ^2.1.3
  path: ^1.9.0
  # Estado
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5
  # Gráficas
  fl_chart: ^0.68.0
  # Utilidades
  uuid: ^4.4.0
  intl: ^0.19.0
  shared_preferences: ^2.2.3

dev_dependencies:
  flutter_test:
    sdk: flutter
  drift_dev: ^2.18.0
  build_runner: ^2.4.11
  riverpod_generator: ^2.4.3
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
```

- [ ] **Step 3: Configurar analysis_options.yaml**

```yaml
include: package:flutter_lints/flutter.yaml

linter:
  rules:
    prefer_const_constructors: true
    prefer_const_declarations: true
    avoid_print: true
```

- [ ] **Step 4: Instalar dependencias**

```bash
flutter pub get
```

Expected: `Running "flutter pub get"...` sin errores.

- [ ] **Step 5: Commit**

```bash
git init
git add pubspec.yaml pubspec.lock analysis_options.yaml
git commit -m "chore: initial Flutter project setup"
```

---

## Task 2: Enums y modelos base

**Files:**
- Create: `lib/core/models/enums.dart`
- Create: `lib/core/models/balance.dart`

- [ ] **Step 1: Crear test para enums**

```dart
// test/core/models/enums_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mi_caja/core/models/enums.dart';

void main() {
  group('TipoMovimiento', () {
    test('fromString expense', () {
      expect(TipoMovimiento.fromString('gasto'), TipoMovimiento.gasto);
    });
    test('fromString income', () {
      expect(TipoMovimiento.fromString('ingreso'), TipoMovimiento.ingreso);
    });
  });

  group('Moneda', () {
    test('símbolo HNL', () => expect(Moneda.hnl.simbolo, 'L.'));
    test('símbolo USD', () => expect(Moneda.usd.simbolo, '\$'));
  });

  group('MetodoPago', () {
    test('label efectivo', () => expect(MetodoPago.efectivo.label, 'Efectivo'));
    test('label tigoMoney', () => expect(MetodoPago.tigoMoney.label, 'Tigo Money'));
    test('label banco', () => expect(MetodoPago.banco.label, 'Banco'));
  });
}
```

- [ ] **Step 2: Correr test — verificar que falla**

```bash
flutter test test/core/models/enums_test.dart
```

Expected: FAIL — `enums.dart` no existe.

- [ ] **Step 3: Crear enums.dart**

```dart
// lib/core/models/enums.dart
enum TipoMovimiento {
  gasto,
  ingreso;

  static TipoMovimiento fromString(String value) {
    return TipoMovimiento.values.firstWhere((e) => e.name == value);
  }
}

enum Moneda {
  hnl,
  usd;

  String get simbolo => switch (this) {
    Moneda.hnl => 'L.',
    Moneda.usd => '\$',
  };
}

enum MetodoPago {
  efectivo,
  tigoMoney,
  banco;

  String get label => switch (this) {
    MetodoPago.efectivo => 'Efectivo',
    MetodoPago.tigoMoney => 'Tigo Money',
    MetodoPago.banco => 'Banco',
  };

  String get emoji => switch (this) {
    MetodoPago.efectivo => '💵',
    MetodoPago.tigoMoney => '📱',
    MetodoPago.banco => '🏦',
  };
}
```

- [ ] **Step 4: Crear test para BalanceBolsillo**

```dart
// test/core/models/balance_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mi_caja/core/models/balance.dart';
import 'package:mi_caja/core/models/enums.dart';

void main() {
  group('BalanceBolsillo', () {
    test('balance positivo', () {
      final b = BalanceBolsillo(
        metodo: MetodoPago.efectivo,
        totalHnl: 850.0,
        totalUsd: 20.0,
      );
      expect(b.tieneHnl, true);
      expect(b.tieneUsd, true);
    });

    test('balance cero no muestra moneda', () {
      final b = BalanceBolsillo(
        metodo: MetodoPago.banco,
        totalHnl: 0.0,
        totalUsd: 0.0,
      );
      expect(b.tieneHnl, false);
      expect(b.tieneUsd, false);
    });
  });
}
```

- [ ] **Step 5: Crear balance.dart**

```dart
// lib/core/models/balance.dart
import 'enums.dart';

class BalanceBolsillo {
  final MetodoPago metodo;
  final double totalHnl;
  final double totalUsd;

  const BalanceBolsillo({
    required this.metodo,
    required this.totalHnl,
    required this.totalUsd,
  });

  bool get tieneHnl => totalHnl != 0;
  bool get tieneUsd => totalUsd != 0;
  bool get estaVacio => !tieneHnl && !tieneUsd;
}
```

- [ ] **Step 6: Correr tests — verificar que pasan**

```bash
flutter test test/core/models/
```

Expected: 5 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add lib/core/models/ test/core/models/
git commit -m "feat: add domain enums and BalanceBolsillo model"
```

---

## Task 3: Base de datos Drift — schema y tablas

**Files:**
- Create: `lib/core/database/app_database.dart`
- Create: `lib/core/database/seed_data.dart`

- [ ] **Step 1: Crear app_database.dart con tablas**

```dart
// lib/core/database/app_database.dart
import 'dart:io';
import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
import '../models/enums.dart';
import 'daos/movimientos_dao.dart';
import 'daos/categorias_dao.dart';

part 'app_database.g.dart';

// ─── Tablas ───────────────────────────────────────────────

class Categorias extends Table {
  TextColumn get id => text()();
  TextColumn get nombre => text().withLength(max: 50)();
  TextColumn get emoji => text().withLength(max: 10)();
  BoolColumn get esDefault => boolean().withDefault(const Constant(false))();
  IntColumn get orden => integer().withDefault(const Constant(0))();

  @override
  Set<Column> get primaryKey => {id};
}

class Movimientos extends Table {
  TextColumn get id => text()();
  RealColumn get monto => real()();
  TextColumn get tipo => text()(); // 'gasto' | 'ingreso'
  TextColumn get moneda => text()(); // 'hnl' | 'usd'
  TextColumn get categoriaId => text().references(Categorias, #id)();
  TextColumn get metodoPago => text()(); // 'efectivo' | 'tigo_money' | 'banco'
  TextColumn get nota => text().nullable().withLength(max: 100)();
  DateTimeColumn get fecha => dateTime()();

  @override
  Set<Column> get primaryKey => {id};
}

// ─── Base de datos ────────────────────────────────────────

@DriftDatabase(
  tables: [Categorias, Movimientos],
  daos: [CategoriasDao, MovimientosDao],
)
class AppDatabase extends _$AppDatabase {
  AppDatabase(super.e);

  AppDatabase.forTesting(super.e);

  @override
  int get schemaVersion => 1;

  @override
  MigrationStrategy get migration => MigrationStrategy(
    onCreate: (m) async {
      await m.createAll();
      await _seedCategorias();
    },
  );

  Future<void> _seedCategorias() async {
    for (final cat in seedCategorias) {
      await into(categorias).insert(cat);
    }
  }
}

// ─── Conexión real ────────────────────────────────────────

LazyDatabase openConnection() {
  return LazyDatabase(() async {
    final dir = await getApplicationDocumentsDirectory();
    final file = File(p.join(dir.path, 'mi_caja.db'));
    return NativeDatabase(file);
  });
}
```

- [ ] **Step 2: Crear seed_data.dart**

```dart
// lib/core/database/seed_data.dart
import 'package:uuid/uuid.dart';
import 'app_database.dart';

const _uuid = Uuid();

final List<CategoriasCompanion> seedCategorias = [
  CategoriasCompanion.insert(
    id: _uuid.v4(), nombre: 'Comida', emoji: '🍽️',
    esDefault: const Value(true), orden: const Value(0),
  ),
  CategoriasCompanion.insert(
    id: _uuid.v4(), nombre: 'Transporte', emoji: '🚌',
    esDefault: const Value(true), orden: const Value(1),
  ),
  CategoriasCompanion.insert(
    id: _uuid.v4(), nombre: 'Mercadería', emoji: '📦',
    esDefault: const Value(true), orden: const Value(2),
  ),
  CategoriasCompanion.insert(
    id: _uuid.v4(), nombre: 'Local/Alquiler', emoji: '🏪',
    esDefault: const Value(true), orden: const Value(3),
  ),
  CategoriasCompanion.insert(
    id: _uuid.v4(), nombre: 'Servicios', emoji: '💡',
    esDefault: const Value(true), orden: const Value(4),
  ),
  CategoriasCompanion.insert(
    id: _uuid.v4(), nombre: 'Personal', emoji: '👤',
    esDefault: const Value(true), orden: const Value(5),
  ),
  CategoriasCompanion.insert(
    id: _uuid.v4(), nombre: 'Remesas', emoji: '💸',
    esDefault: const Value(true), orden: const Value(6),
  ),
  CategoriasCompanion.insert(
    id: _uuid.v4(), nombre: 'Otro', emoji: '🗂️',
    esDefault: const Value(true), orden: const Value(7),
  ),
];
```

- [ ] **Step 3: Crear DAOs vacíos (necesarios para que compile)**

```dart
// lib/core/database/daos/categorias_dao.dart
import 'package:drift/drift.dart';
import '../app_database.dart';

part 'categorias_dao.g.dart';

@DriftAccessor(tables: [Categorias])
class CategoriasDao extends DatabaseAccessor<AppDatabase>
    with _$CategoriasDaoMixin {
  CategoriasDao(super.db);
}
```

```dart
// lib/core/database/daos/movimientos_dao.dart
import 'package:drift/drift.dart';
import '../app_database.dart';

part 'movimientos_dao.g.dart';

@DriftAccessor(tables: [Movimientos, Categorias])
class MovimientosDao extends DatabaseAccessor<AppDatabase>
    with _$MovimientosDaoMixin {
  MovimientosDao(super.db);
}
```

- [ ] **Step 4: Generar código Drift**

```bash
dart run build_runner build --delete-conflicting-outputs
```

Expected: genera `app_database.g.dart`, `categorias_dao.g.dart`, `movimientos_dao.g.dart`. Sin errores.

- [ ] **Step 5: Crear helper de test DB en memoria**

```dart
// test/helpers/test_database.dart
import 'package:drift/native.dart';
import 'package:mi_caja/core/database/app_database.dart';

AppDatabase createTestDatabase() {
  return AppDatabase.forTesting(NativeDatabase.memory());
}
```

- [ ] **Step 6: Test de schema y seed**

```dart
// test/core/daos/categorias_dao_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mi_caja/core/database/app_database.dart';
import '../../helpers/test_database.dart';

void main() {
  late AppDatabase db;

  setUp(() {
    db = createTestDatabase();
  });

  tearDown(() async {
    await db.close();
  });

  test('seed crea 8 categorías default', () async {
    final cats = await db.select(db.categorias).get();
    expect(cats.length, 8);
    expect(cats.every((c) => c.esDefault), true);
  });

  test('primera categoría es Comida', () async {
    final cats = await (db.select(db.categorias)
      ..orderBy([(c) => OrderingTerm.asc(c.orden)]))
      .get();
    expect(cats.first.nombre, 'Comida');
  });
}
```

- [ ] **Step 7: Correr tests**

```bash
flutter test test/core/daos/categorias_dao_test.dart
```

Expected: 2 tests PASS.

- [ ] **Step 8: Commit**

```bash
git add lib/core/database/ test/core/daos/categorias_dao_test.dart test/helpers/
git commit -m "feat: Drift database schema with seed categories"
```

---

## Task 4: CategoriasDao — queries completos

**Files:**
- Modify: `lib/core/database/daos/categorias_dao.dart`

- [ ] **Step 1: Agregar tests de CategoriasDao**

```dart
// Agregar a test/core/daos/categorias_dao_test.dart

  group('CategoriasDao', () {
    test('watchAll emite lista de categorías', () async {
      final stream = db.categoriasDao.watchAll();
      final cats = await stream.first;
      expect(cats.length, 8);
    });

    test('insertar categoría custom', () async {
      await db.categoriasDao.insertar(CategoriasCompanion.insert(
        id: 'test-id',
        nombre: 'Farmacia',
        emoji: '💊',
        esDefault: const Value(false),
        orden: const Value(10),
      ));
      final cats = await db.select(db.categorias).get();
      expect(cats.length, 9);
      expect(cats.any((c) => c.nombre == 'Farmacia'), true);
    });

    test('no puede borrar categoría default', () async {
      final cats = await db.select(db.categorias).get();
      final defaultCat = cats.first;
      expect(
        () async => db.categoriasDao.borrar(defaultCat.id),
        throwsA(isA<Exception>()),
      );
    });

    test('borrar categoría custom', () async {
      await db.categoriasDao.insertar(CategoriasCompanion.insert(
        id: 'custom-1',
        nombre: 'Test',
        emoji: '🧪',
        esDefault: const Value(false),
        orden: const Value(99),
      ));
      await db.categoriasDao.borrar('custom-1');
      final cats = await db.select(db.categorias).get();
      expect(cats.any((c) => c.id == 'custom-1'), false);
    });
  });
```

- [ ] **Step 2: Correr tests — verificar que fallan**

```bash
flutter test test/core/daos/categorias_dao_test.dart
```

Expected: FAIL — métodos no existen en DAO.

- [ ] **Step 3: Implementar CategoriasDao**

```dart
// lib/core/database/daos/categorias_dao.dart
import 'package:drift/drift.dart';
import '../app_database.dart';

part 'categorias_dao.g.dart';

@DriftAccessor(tables: [Categorias])
class CategoriasDao extends DatabaseAccessor<AppDatabase>
    with _$CategoriasDaoMixin {
  CategoriasDao(super.db);

  Stream<List<Categoria>> watchAll() =>
      (select(categorias)..orderBy([(c) => OrderingTerm.asc(c.orden)]))
          .watch();

  Future<List<Categoria>> getAll() =>
      (select(categorias)..orderBy([(c) => OrderingTerm.asc(c.orden)])).get();

  Future<void> insertar(CategoriasCompanion cat) =>
      into(categorias).insert(cat);

  Future<void> borrar(String id) async {
    final cat = await (select(categorias)
      ..where((c) => c.id.equals(id)))
      .getSingleOrNull();
    if (cat == null) return;
    if (cat.esDefault) throw Exception('No se puede borrar categoría default');
    await (delete(categorias)..where((c) => c.id.equals(id))).go();
  }
}
```

- [ ] **Step 4: Regenerar código**

```bash
dart run build_runner build --delete-conflicting-outputs
```

- [ ] **Step 5: Correr tests**

```bash
flutter test test/core/daos/categorias_dao_test.dart
```

Expected: 6 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/core/database/daos/categorias_dao.dart
git commit -m "feat: CategoriasDao with watch, insert, delete"
```

---

## Task 5: MovimientosDao — CRUD + balance

**Files:**
- Modify: `lib/core/database/daos/movimientos_dao.dart`
- Create: `test/core/daos/movimientos_dao_test.dart`

- [ ] **Step 1: Escribir tests**

```dart
// test/core/daos/movimientos_dao_test.dart
import 'package:drift/drift.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mi_caja/core/database/app_database.dart';
import 'package:mi_caja/core/models/enums.dart';
import '../../helpers/test_database.dart';

void main() {
  late AppDatabase db;
  late String categoriaId;

  setUp(() async {
    db = createTestDatabase();
    final cats = await db.select(db.categorias).get();
    categoriaId = cats.first.id;
  });

  tearDown(() async => db.close());

  MovimientosCompanion _mov({
    required double monto,
    required String tipo,
    required String moneda,
    required String metodoPago,
    DateTime? fecha,
  }) =>
      MovimientosCompanion.insert(
        id: DateTime.now().microsecondsSinceEpoch.toString(),
        monto: monto,
        tipo: tipo,
        moneda: moneda,
        categoriaId: categoriaId,
        metodoPago: metodoPago,
        fecha: fecha ?? DateTime.now(),
      );

  test('insertar y recuperar movimiento', () async {
    await db.movimientosDao.insertar(_mov(
      monto: 150.0, tipo: 'gasto', moneda: 'hnl', metodoPago: 'efectivo',
    ));
    final movs = await db.select(db.movimientos).get();
    expect(movs.length, 1);
    expect(movs.first.monto, 150.0);
  });

  test('borrar movimiento', () async {
    await db.movimientosDao.insertar(_mov(
      monto: 100.0, tipo: 'gasto', moneda: 'hnl', metodoPago: 'efectivo',
    ));
    final movs = await db.select(db.movimientos).get();
    await db.movimientosDao.borrar(movs.first.id);
    final after = await db.select(db.movimientos).get();
    expect(after.isEmpty, true);
  });

  test('balance HNL efectivo correcto', () async {
    await db.movimientosDao.insertar(_mov(
      monto: 500.0, tipo: 'ingreso', moneda: 'hnl', metodoPago: 'efectivo',
    ));
    await db.movimientosDao.insertar(_mov(
      monto: 150.0, tipo: 'gasto', moneda: 'hnl', metodoPago: 'efectivo',
    ));
    final balances = await db.movimientosDao.getBalances();
    final efectivo = balances.firstWhere(
      (b) => b.metodo == MetodoPago.efectivo,
    );
    expect(efectivo.totalHnl, 350.0);
    expect(efectivo.totalUsd, 0.0);
  });

  test('watchHoy solo devuelve movimientos de hoy', () async {
    final ayer = DateTime.now().subtract(const Duration(days: 1));
    await db.movimientosDao.insertar(_mov(
      monto: 100.0, tipo: 'gasto', moneda: 'hnl',
      metodoPago: 'efectivo', fecha: ayer,
    ));
    await db.movimientosDao.insertar(_mov(
      monto: 200.0, tipo: 'gasto', moneda: 'hnl',
      metodoPago: 'efectivo', fecha: DateTime.now(),
    ));
    final hoy = await db.movimientosDao.watchPorPeriodo(
      desde: DateTime.now().copyWith(hour: 0, minute: 0, second: 0),
      hasta: DateTime.now().copyWith(hour: 23, minute: 59, second: 59),
    ).first;
    expect(hoy.length, 1);
    expect(hoy.first.monto, 200.0);
  });
}
```

- [ ] **Step 2: Correr tests — verificar que fallan**

```bash
flutter test test/core/daos/movimientos_dao_test.dart
```

Expected: FAIL.

- [ ] **Step 3: Implementar MovimientosDao**

```dart
// lib/core/database/daos/movimientos_dao.dart
import 'package:drift/drift.dart';
import '../app_database.dart';
import '../../models/enums.dart';
import '../../models/balance.dart';

part 'movimientos_dao.g.dart';

@DriftAccessor(tables: [Movimientos, Categorias])
class MovimientosDao extends DatabaseAccessor<AppDatabase>
    with _$MovimientosDaoMixin {
  MovimientosDao(super.db);

  Future<void> insertar(MovimientosCompanion mov) =>
      into(movimientos).insert(mov);

  Future<void> borrar(String id) =>
      (delete(movimientos)..where((m) => m.id.equals(id))).go();

  Stream<List<Movimiento>> watchPorPeriodo({
    required DateTime desde,
    required DateTime hasta,
  }) =>
      (select(movimientos)
        ..where((m) => m.fecha.isBetweenValues(desde, hasta))
        ..orderBy([(m) => OrderingTerm.desc(m.fecha)]))
      .watch();

  Stream<List<Movimiento>> watchTodos() =>
      (select(movimientos)
        ..orderBy([(m) => OrderingTerm.desc(m.fecha)]))
      .watch();

  Future<List<BalanceBolsillo>> getBalances() async {
    final rows = await select(movimientos).get();
    final Map<String, Map<String, double>> acc = {
      for (final m in MetodoPago.values) m.name: {'hnl': 0.0, 'usd': 0.0},
    };

    for (final m in rows) {
      final signo = m.tipo == 'ingreso' ? 1.0 : -1.0;
      acc[m.metodoPago]![m.moneda] =
          (acc[m.metodoPago]![m.moneda] ?? 0.0) + (m.monto * signo);
    }

    return MetodoPago.values.map((mp) {
      return BalanceBolsillo(
        metodo: mp,
        totalHnl: acc[mp.name]!['hnl']!,
        totalUsd: acc[mp.name]!['usd']!,
      );
    }).toList();
  }
}
```

- [ ] **Step 4: Regenerar código**

```bash
dart run build_runner build --delete-conflicting-outputs
```

- [ ] **Step 5: Correr tests**

```bash
flutter test test/core/daos/movimientos_dao_test.dart
```

Expected: 4 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/core/database/daos/movimientos_dao.dart test/core/daos/movimientos_dao_test.dart
git commit -m "feat: MovimientosDao with CRUD, balance, and period watch"
```

---

## Task 6: Providers Riverpod

**Files:**
- Create: `lib/core/providers/database_provider.dart`
- Create: `lib/core/providers/movimientos_provider.dart`
- Create: `lib/core/providers/categorias_provider.dart`
- Create: `lib/core/providers/balance_provider.dart`
- Create: `lib/core/providers/settings_provider.dart`

- [ ] **Step 1: Provider de base de datos**

```dart
// lib/core/providers/database_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../database/app_database.dart';

final databaseProvider = Provider<AppDatabase>((ref) {
  final db = AppDatabase(openConnection());
  ref.onDispose(db.close);
  return db;
});
```

- [ ] **Step 2: Provider de categorías**

```dart
// lib/core/providers/categorias_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../database/app_database.dart';
import 'database_provider.dart';

final categoriasProvider = StreamProvider<List<Categoria>>((ref) {
  final db = ref.watch(databaseProvider);
  return db.categoriasDao.watchAll();
});
```

- [ ] **Step 3: Provider de movimientos por período**

```dart
// lib/core/providers/movimientos_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../database/app_database.dart';
import 'database_provider.dart';

enum FiltroPeriodo { hoy, semana, mes, todo }

final filtroPeriodoProvider =
    StateProvider<FiltroPeriodo>((_) => FiltroPeriodo.hoy);

DateTimeRange _rango(FiltroPeriodo filtro) {
  final now = DateTime.now();
  final hoy = DateTime(now.year, now.month, now.day);
  return switch (filtro) {
    FiltroPeriodo.hoy => DateTimeRange(
        start: hoy,
        end: hoy.add(const Duration(days: 1)),
      ),
    FiltroPeriodo.semana => DateTimeRange(
        start: hoy.subtract(Duration(days: now.weekday - 1)),
        end: hoy.add(const Duration(days: 1)),
      ),
    FiltroPeriodo.mes => DateTimeRange(
        start: DateTime(now.year, now.month, 1),
        end: hoy.add(const Duration(days: 1)),
      ),
    FiltroPeriodo.todo => DateTimeRange(
        start: DateTime(2020),
        end: hoy.add(const Duration(days: 1)),
      ),
  };
}

final movimientosFiltradosProvider = StreamProvider<List<Movimiento>>((ref) {
  final db = ref.watch(databaseProvider);
  final filtro = ref.watch(filtroPeriodoProvider);
  final rango = _rango(filtro);
  return db.movimientosDao.watchPorPeriodo(
    desde: rango.start,
    hasta: rango.end,
  );
});

final todosMovimientosProvider = StreamProvider<List<Movimiento>>((ref) {
  final db = ref.watch(databaseProvider);
  return db.movimientosDao.watchTodos();
});
```

- [ ] **Step 4: Provider de balances**

```dart
// lib/core/providers/balance_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/balance.dart';
import 'database_provider.dart';

final balancesProvider = FutureProvider.autoDispose<List<BalanceBolsillo>>((ref) {
  final db = ref.watch(databaseProvider);
  // Re-fetch cuando cambien movimientos
  ref.watch(databaseProvider);
  return db.movimientosDao.getBalances();
});
```

- [ ] **Step 5: Provider de settings**

```dart
// lib/core/providers/settings_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/enums.dart';

final sharedPreferencesProvider = Provider<SharedPreferences>((ref) {
  throw UnimplementedError('Override in main()');
});

final monedaDefaultProvider = StateNotifierProvider<MonedaNotifier, Moneda>((ref) {
  final prefs = ref.watch(sharedPreferencesProvider);
  return MonedaNotifier(prefs);
});

class MonedaNotifier extends StateNotifier<Moneda> {
  final SharedPreferences _prefs;
  static const _key = 'moneda_default';

  MonedaNotifier(this._prefs)
      : super(
          Moneda.values.firstWhere(
            (m) => m.name == (_prefs.getString(_key) ?? 'hnl'),
            orElse: () => Moneda.hnl,
          ),
        );

  Future<void> set(Moneda moneda) async {
    state = moneda;
    await _prefs.setString(_key, moneda.name);
  }
}
```

- [ ] **Step 6: Actualizar main.dart**

```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'app.dart';
import 'core/providers/settings_provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();

  runApp(
    ProviderScope(
      overrides: [
        sharedPreferencesProvider.overrideWithValue(prefs),
      ],
      child: const MiCajaApp(),
    ),
  );
}
```

- [ ] **Step 7: Verificar que compila**

```bash
flutter build apk --debug 2>&1 | tail -5
```

Expected: `Built build/app/outputs/...` sin errores.

- [ ] **Step 8: Commit**

```bash
git add lib/core/providers/ lib/main.dart
git commit -m "feat: Riverpod providers for DB, movimientos, categorias, settings"
```

---

## Task 7: Shared — Theme y Formatters

**Files:**
- Create: `lib/shared/theme.dart`
- Create: `lib/shared/formatters.dart`
- Create: `lib/app.dart`

- [ ] **Step 1: Tests de formatters**

```dart
// test/shared/formatters_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mi_caja/shared/formatters.dart';

void main() {
  test('formatHNL formatea con L.', () {
    expect(formatHNL(850.5), 'L. 850.50');
    expect(formatHNL(1200), 'L. 1,200.00');
  });

  test('formatUSD formatea con \$', () {
    expect(formatUSD(20.0), '\$ 20.00');
    expect(formatUSD(1500.75), '\$ 1,500.75');
  });
}
```

- [ ] **Step 2: Implementar formatters**

```dart
// lib/shared/formatters.dart
import 'package:intl/intl.dart';

final _hnlFormat = NumberFormat('#,##0.00', 'es_HN');
final _usdFormat = NumberFormat('#,##0.00', 'en_US');

String formatHNL(double amount) => 'L. ${_hnlFormat.format(amount)}';
String formatUSD(double amount) => '\$ ${_usdFormat.format(amount)}';
```

- [ ] **Step 3: Correr tests**

```bash
flutter test test/shared/formatters_test.dart
```

Expected: 2 tests PASS.

- [ ] **Step 4: Crear theme.dart**

```dart
// lib/shared/theme.dart
import 'package:flutter/material.dart';

const _primary = Color(0xFF1B5E20); // Verde oscuro (dinero)
const _accent = Color(0xFF43A047);

ThemeData buildTheme() {
  return ThemeData(
    colorScheme: ColorScheme.fromSeed(
      seedColor: _primary,
      primary: _primary,
      secondary: _accent,
    ),
    useMaterial3: true,
    fontFamily: 'Roboto',
    appBarTheme: const AppBarTheme(
      centerTitle: false,
      backgroundColor: _primary,
      foregroundColor: Colors.white,
      elevation: 0,
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size(double.infinity, 52),
        textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
      ),
    ),
  );
}
```

- [ ] **Step 5: Crear app.dart**

```dart
// lib/app.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'shared/theme.dart';
import 'shared/widgets/app_scaffold.dart';

class MiCajaApp extends ConsumerWidget {
  const MiCajaApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      title: 'Mi Caja',
      theme: buildTheme(),
      home: const AppScaffold(),
      debugShowCheckedModeBanner: false,
    );
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add lib/shared/ lib/app.dart test/shared/
git commit -m "feat: theme, formatters, app shell"
```

---

## Task 8: Navegación y AppScaffold

**Files:**
- Create: `lib/shared/widgets/app_scaffold.dart`

- [ ] **Step 1: Crear AppScaffold con bottom nav**

```dart
// lib/shared/widgets/app_scaffold.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../features/home/home_screen.dart';
import '../../features/historial/historial_screen.dart';
import '../../features/resumen/resumen_screen.dart';
import '../../features/ajustes/ajustes_screen.dart';

final _navIndexProvider = StateProvider<int>((_) => 0);

class AppScaffold extends ConsumerWidget {
  const AppScaffold({super.key});

  static const _screens = [
    HomeScreen(),
    HistorialScreen(),
    ResumenScreen(),
    AjustesScreen(),
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(_navIndexProvider);
    return Scaffold(
      body: _screens[index],
      bottomNavigationBar: NavigationBar(
        selectedIndex: index,
        onDestinationSelected: (i) =>
            ref.read(_navIndexProvider.notifier).state = i,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Inicio'),
          NavigationDestination(icon: Icon(Icons.list_alt_outlined), selectedIcon: Icon(Icons.list_alt), label: 'Historial'),
          NavigationDestination(icon: Icon(Icons.pie_chart_outline), selectedIcon: Icon(Icons.pie_chart), label: 'Resumen'),
          NavigationDestination(icon: Icon(Icons.settings_outlined), selectedIcon: Icon(Icons.settings), label: 'Ajustes'),
        ],
      ),
    );
  }
}
```

- [ ] **Step 2: Crear stubs para todas las pantallas**

```dart
// lib/features/home/home_screen.dart
import 'package:flutter/material.dart';
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Home'));
}
```

```dart
// lib/features/historial/historial_screen.dart
import 'package:flutter/material.dart';
class HistorialScreen extends StatelessWidget {
  const HistorialScreen({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Historial'));
}
```

```dart
// lib/features/resumen/resumen_screen.dart
import 'package:flutter/material.dart';
class ResumenScreen extends StatelessWidget {
  const ResumenScreen({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Resumen'));
}
```

```dart
// lib/features/ajustes/ajustes_screen.dart
import 'package:flutter/material.dart';
class AjustesScreen extends StatelessWidget {
  const AjustesScreen({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Ajustes'));
}
```

- [ ] **Step 3: Verificar que la app corre**

```bash
flutter run
```

Expected: app abre con bottom nav de 4 tabs, cada tab muestra su texto.

- [ ] **Step 4: Commit**

```bash
git add lib/shared/widgets/ lib/features/
git commit -m "feat: bottom nav scaffold with screen stubs"
```

---

## Task 9: Pantalla Home

**Files:**
- Modify: `lib/features/home/home_screen.dart`
- Create: `lib/features/home/widgets/balance_card.dart`
- Create: `lib/features/home/widgets/bolsillos_row.dart`
- Create: `lib/features/agregar/agregar_screen.dart` (stub completo)

- [ ] **Step 1: Crear balance_card.dart**

```dart
// lib/features/home/widgets/balance_card.dart
import 'package:flutter/material.dart';
import '../../../core/models/balance.dart';
import '../../../shared/formatters.dart';

class BalanceCard extends StatelessWidget {
  final List<BalanceBolsillo> bolsillos;

  const BalanceCard({super.key, required this.bolsillos});

  double get _totalHnl =>
      bolsillos.fold(0, (sum, b) => sum + b.totalHnl);
  double get _totalUsd =>
      bolsillos.fold(0, (sum, b) => sum + b.totalUsd);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      color: theme.colorScheme.primary,
      margin: const EdgeInsets.all(16),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Balance total',
                style: theme.textTheme.labelLarge
                    ?.copyWith(color: Colors.white70)),
            const SizedBox(height: 8),
            if (_totalHnl != 0)
              Text(formatHNL(_totalHnl),
                  style: theme.textTheme.headlineMedium
                      ?.copyWith(color: Colors.white, fontWeight: FontWeight.bold)),
            if (_totalUsd != 0)
              Text(formatUSD(_totalUsd),
                  style: theme.textTheme.titleLarge
                      ?.copyWith(color: Colors.white70)),
            if (_totalHnl == 0 && _totalUsd == 0)
              Text('Sin movimientos aún',
                  style: theme.textTheme.bodyLarge
                      ?.copyWith(color: Colors.white60)),
          ],
        ),
      ),
    );
  }
}
```

- [ ] **Step 2: Crear bolsillos_row.dart**

```dart
// lib/features/home/widgets/bolsillos_row.dart
import 'package:flutter/material.dart';
import '../../../core/models/balance.dart';
import '../../../core/models/enums.dart';
import '../../../shared/formatters.dart';

class BolsillosRow extends StatelessWidget {
  final List<BalanceBolsillo> bolsillos;

  const BolsillosRow({super.key, required this.bolsillos});

  @override
  Widget build(BuildContext context) {
    final noVacios = bolsillos.where((b) => !b.estaVacio).toList();
    if (noVacios.isEmpty) {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Text('Agrega tu primer movimiento para ver tus bolsillos.',
            style: Theme.of(context).textTheme.bodyMedium),
      );
    }
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Mis bolsillos',
              style: Theme.of(context).textTheme.titleSmall),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: noVacios.map((b) => _BolsilloChip(bolsillo: b)).toList(),
          ),
        ],
      ),
    );
  }
}

class _BolsilloChip extends StatelessWidget {
  final BalanceBolsillo bolsillo;
  const _BolsilloChip({required this.bolsillo});

  @override
  Widget build(BuildContext context) {
    return Chip(
      avatar: Text(bolsillo.metodo.emoji),
      label: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(bolsillo.metodo.label,
              style: const TextStyle(fontWeight: FontWeight.w600)),
          if (bolsillo.tieneHnl) Text(formatHNL(bolsillo.totalHnl)),
          if (bolsillo.tieneUsd) Text(formatUSD(bolsillo.totalUsd)),
        ],
      ),
    );
  }
}
```

- [ ] **Step 3: Implementar HomeScreen**

```dart
// lib/features/home/home_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers/balance_provider.dart';
import 'widgets/balance_card.dart';
import 'widgets/bolsillos_row.dart';
import '../agregar/agregar_screen.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final balancesAsync = ref.watch(balancesProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Mi Caja')),
      body: RefreshIndicator(
        onRefresh: () => ref.refresh(balancesProvider.future),
        child: ListView(
          children: [
            balancesAsync.when(
              data: (balances) => BalanceCard(bolsillos: balances),
              loading: () => const SizedBox(
                height: 120,
                child: Center(child: CircularProgressIndicator()),
              ),
              error: (e, _) => Padding(
                padding: const EdgeInsets.all(16),
                child: Text('Error: $e'),
              ),
            ),
            const SizedBox(height: 16),
            balancesAsync.when(
              data: (balances) => BolsillosRow(bolsillos: balances),
              loading: () => const SizedBox.shrink(),
              error: (_, __) => const SizedBox.shrink(),
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
      floatingActionButton: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          FloatingActionButton.extended(
            heroTag: 'ingreso',
            onPressed: () => _abrirAgregar(context, esGasto: false),
            icon: const Icon(Icons.add),
            label: const Text('Ingreso'),
            backgroundColor: Colors.green,
          ),
          const SizedBox(height: 12),
          FloatingActionButton.extended(
            heroTag: 'gasto',
            onPressed: () => _abrirAgregar(context, esGasto: true),
            icon: const Icon(Icons.remove),
            label: const Text('Gasto'),
            backgroundColor: Colors.red,
          ),
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  void _abrirAgregar(BuildContext context, {required bool esGasto}) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (_) => AgregarScreen(esGasto: esGasto),
    );
  }
}
```

- [ ] **Step 4: Stub AgregarScreen**

```dart
// lib/features/agregar/agregar_screen.dart
import 'package:flutter/material.dart';

class AgregarScreen extends StatelessWidget {
  final bool esGasto;
  const AgregarScreen({super.key, required this.esGasto});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.9,
      child: Center(
        child: Text(esGasto ? 'Agregar Gasto' : 'Agregar Ingreso'),
      ),
    );
  }
}
```

- [ ] **Step 5: Correr app — verificar Home**

```bash
flutter run
```

Expected: Home muestra BalanceCard verde, dos FABs (Ingreso/Gasto), bottom sheet stub al tocar.

- [ ] **Step 6: Commit**

```bash
git add lib/features/home/ lib/features/agregar/agregar_screen.dart
git commit -m "feat: Home screen with balance card and bolsillos"
```

---

## Task 10: Pantalla Agregar Movimiento

**Files:**
- Modify: `lib/features/agregar/agregar_screen.dart`
- Create: `lib/features/agregar/widgets/monto_input.dart`
- Create: `lib/features/agregar/widgets/categoria_grid.dart`
- Create: `lib/features/agregar/widgets/metodo_selector.dart`

- [ ] **Step 1: Crear monto_input.dart**

```dart
// lib/features/agregar/widgets/monto_input.dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../core/models/enums.dart';

class MontoInput extends StatelessWidget {
  final TextEditingController controller;
  final Moneda moneda;
  final ValueChanged<Moneda> onMonedaChanged;

  const MontoInput({
    super.key,
    required this.controller,
    required this.moneda,
    required this.onMonedaChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SegmentedButton<Moneda>(
          segments: const [
            ButtonSegment(value: Moneda.hnl, label: Text('HNL')),
            ButtonSegment(value: Moneda.usd, label: Text('USD')),
          ],
          selected: {moneda},
          onSelectionChanged: (s) => onMonedaChanged(s.first),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: TextField(
            controller: controller,
            autofocus: true,
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            inputFormatters: [
              FilteringTextInputFormatter.allow(RegExp(r'^\d+\.?\d{0,2}')),
            ],
            style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
            decoration: InputDecoration(
              prefixText: '${moneda.simbolo} ',
              border: const OutlineInputBorder(),
              hintText: '0.00',
            ),
          ),
        ),
      ],
    );
  }
}
```

- [ ] **Step 2: Crear categoria_grid.dart**

```dart
// lib/features/agregar/widgets/categoria_grid.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/database/app_database.dart';
import '../../../core/providers/categorias_provider.dart';

class CategoriaGrid extends ConsumerWidget {
  final String? selectedId;
  final ValueChanged<Categoria> onSelected;

  const CategoriaGrid({
    super.key,
    required this.selectedId,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final categoriasAsync = ref.watch(categoriasProvider);
    return categoriasAsync.when(
      data: (cats) => GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 4,
          childAspectRatio: 0.85,
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
        ),
        itemCount: cats.length,
        itemBuilder: (_, i) {
          final cat = cats[i];
          final selected = cat.id == selectedId;
          return InkWell(
            onTap: () => onSelected(cat),
            borderRadius: BorderRadius.circular(12),
            child: Container(
              decoration: BoxDecoration(
                color: selected
                    ? Theme.of(context).colorScheme.primaryContainer
                    : Theme.of(context).colorScheme.surfaceVariant,
                borderRadius: BorderRadius.circular(12),
                border: selected
                    ? Border.all(
                        color: Theme.of(context).colorScheme.primary,
                        width: 2)
                    : null,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(cat.emoji, style: const TextStyle(fontSize: 28)),
                  const SizedBox(height: 4),
                  Text(cat.nombre,
                      style: const TextStyle(fontSize: 11),
                      textAlign: TextAlign.center,
                      maxLines: 2),
                ],
              ),
            ),
          );
        },
      ),
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => Text('Error: $e'),
    );
  }
}
```

- [ ] **Step 3: Crear metodo_selector.dart**

```dart
// lib/features/agregar/widgets/metodo_selector.dart
import 'package:flutter/material.dart';
import '../../../core/models/enums.dart';

class MetodoSelector extends StatelessWidget {
  final MetodoPago? selected;
  final ValueChanged<MetodoPago> onSelected;

  const MetodoSelector({
    super.key,
    required this.selected,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: MetodoPago.values.map((mp) {
        final isSelected = mp == selected;
        return Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4),
            child: OutlinedButton(
              style: OutlinedButton.styleFrom(
                backgroundColor: isSelected
                    ? Theme.of(context).colorScheme.primaryContainer
                    : null,
                side: isSelected
                    ? BorderSide(
                        color: Theme.of(context).colorScheme.primary, width: 2)
                    : null,
              ),
              onPressed: () => onSelected(mp),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(mp.emoji, style: const TextStyle(fontSize: 20)),
                  Text(mp.label,
                      style: const TextStyle(fontSize: 11),
                      textAlign: TextAlign.center),
                ],
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}
```

- [ ] **Step 4: Implementar AgregarScreen completo**

```dart
// lib/features/agregar/agregar_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';
import '../../core/database/app_database.dart';
import '../../core/models/enums.dart';
import '../../core/providers/database_provider.dart';
import '../../core/providers/settings_provider.dart';
import 'widgets/monto_input.dart';
import 'widgets/categoria_grid.dart';
import 'widgets/metodo_selector.dart';

class AgregarScreen extends ConsumerStatefulWidget {
  final bool esGasto;
  const AgregarScreen({super.key, required this.esGasto});

  @override
  ConsumerState<AgregarScreen> createState() => _AgregarScreenState();
}

class _AgregarScreenState extends ConsumerState<AgregarScreen> {
  final _montoCtrl = TextEditingController();
  final _notaCtrl = TextEditingController();
  late Moneda _moneda;
  Categoria? _categoria;
  MetodoPago? _metodo;
  bool _guardando = false;

  @override
  void initState() {
    super.initState();
    _moneda = ref.read(monedaDefaultProvider);
  }

  @override
  void dispose() {
    _montoCtrl.dispose();
    _notaCtrl.dispose();
    super.dispose();
  }

  bool get _puedeGuardar =>
      _montoCtrl.text.isNotEmpty &&
      double.tryParse(_montoCtrl.text) != null &&
      double.parse(_montoCtrl.text) > 0 &&
      _categoria != null &&
      _metodo != null;

  Future<void> _guardar() async {
    if (!_puedeGuardar) return;
    setState(() => _guardando = true);

    final db = ref.read(databaseProvider);
    await db.movimientosDao.insertar(
      MovimientosCompanion.insert(
        id: const Uuid().v4(),
        monto: double.parse(_montoCtrl.text),
        tipo: widget.esGasto ? 'gasto' : 'ingreso',
        moneda: _moneda.name,
        categoriaId: _categoria!.id,
        metodoPago: _metodo!.name,
        nota: Value(_notaCtrl.text.isEmpty ? null : _notaCtrl.text),
        fecha: DateTime.now(),
      ),
    );

    if (mounted) Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final color = widget.esGasto ? Colors.red : Colors.green;
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
        left: 16, right: 16, top: 16,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Text(
              widget.esGasto ? 'Nuevo Gasto' : 'Nuevo Ingreso',
              style: Theme.of(context).textTheme.titleLarge
                  ?.copyWith(color: color, fontWeight: FontWeight.bold),
            ),
            const Spacer(),
            IconButton(
              icon: const Icon(Icons.close),
              onPressed: () => Navigator.of(context).pop(),
            ),
          ]),
          const SizedBox(height: 16),
          MontoInput(
            controller: _montoCtrl,
            moneda: _moneda,
            onMonedaChanged: (m) => setState(() => _moneda = m),
          ),
          const SizedBox(height: 16),
          Text('Categoría', style: Theme.of(context).textTheme.titleSmall),
          const SizedBox(height: 8),
          CategoriaGrid(
            selectedId: _categoria?.id,
            onSelected: (c) => setState(() => _categoria = c),
          ),
          const SizedBox(height: 16),
          Text('¿Dónde está el dinero?',
              style: Theme.of(context).textTheme.titleSmall),
          const SizedBox(height: 8),
          MetodoSelector(
            selected: _metodo,
            onSelected: (m) => setState(() => _metodo = m),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _notaCtrl,
            decoration: const InputDecoration(
              hintText: 'Nota opcional...',
              border: OutlineInputBorder(),
              isDense: true,
            ),
            maxLength: 100,
          ),
          const SizedBox(height: 16),
          ListenableBuilder(
            listenable: _montoCtrl,
            builder: (_, __) => FilledButton(
              onPressed: _puedeGuardar && !_guardando ? _guardar : null,
              style: FilledButton.styleFrom(backgroundColor: color),
              child: _guardando
                  ? const SizedBox(
                      height: 20, width: 20,
                      child: CircularProgressIndicator(
                          strokeWidth: 2, color: Colors.white),
                    )
                  : Text(widget.esGasto ? 'Guardar Gasto' : 'Guardar Ingreso'),
            ),
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}
```

- [ ] **Step 5: Correr app — verificar flujo completo**

```bash
flutter run
```

Expected: tap "Gasto" → bottom sheet con monto input, grid de categorías, 3 botones de método, botón guardar. Guardar cierra sheet y actualiza balance en Home.

- [ ] **Step 6: Commit**

```bash
git add lib/features/agregar/
git commit -m "feat: Agregar movimiento screen — monto, categoría, método, guardar"
```

---

## Task 11: Pantalla Historial

**Files:**
- Modify: `lib/features/historial/historial_screen.dart`
- Create: `lib/features/historial/widgets/movimiento_tile.dart`
- Create: `lib/features/historial/widgets/filtro_chips.dart`

- [ ] **Step 1: movimiento_tile.dart**

```dart
// lib/features/historial/widgets/movimiento_tile.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import '../../../core/database/app_database.dart';
import '../../../core/models/enums.dart';
import '../../../core/providers/categorias_provider.dart';
import '../../../shared/formatters.dart';

class MovimientoTile extends ConsumerWidget {
  final Movimiento movimiento;
  final VoidCallback? onDelete;

  const MovimientoTile({
    super.key,
    required this.movimiento,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final categoriasAsync = ref.watch(categoriasProvider);
    final tipo = TipoMovimiento.fromString(movimiento.tipo);
    final moneda = Moneda.values.firstWhere((m) => m.name == movimiento.moneda);
    final color = tipo == TipoMovimiento.gasto ? Colors.red : Colors.green;
    final signo = tipo == TipoMovimiento.gasto ? '-' : '+';

    final categoriaEmoji = categoriasAsync.whenData(
      (cats) => cats.firstWhere(
        (c) => c.id == movimiento.categoriaId,
        orElse: () => cats.last,
      ).emoji,
    ).valueOrNull ?? '🗂️';

    return Dismissible(
      key: Key(movimiento.id),
      direction: DismissDirection.endToStart,
      background: Container(
        color: Colors.red,
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 16),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      onDismissed: (_) => onDelete?.call(),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: color.withOpacity(0.1),
          child: Text(categoriaEmoji, style: const TextStyle(fontSize: 20)),
        ),
        title: Text(
          movimiento.nota ?? 'Sin nota',
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        subtitle: Text(
          DateFormat('dd/MM/yyyy HH:mm').format(movimiento.fecha),
          style: Theme.of(context).textTheme.bodySmall,
        ),
        trailing: Text(
          '$signo ${moneda == Moneda.hnl ? formatHNL(movimiento.monto) : formatUSD(movimiento.monto)}',
          style: TextStyle(
            color: color,
            fontWeight: FontWeight.bold,
            fontSize: 15,
          ),
        ),
      ),
    );
  }
}
```

- [ ] **Step 2: filtro_chips.dart**

```dart
// lib/features/historial/widgets/filtro_chips.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/providers/movimientos_provider.dart';

class FiltroChips extends ConsumerWidget {
  const FiltroChips({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final filtro = ref.watch(filtroPeriodoProvider);
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: [
          for (final f in FiltroPeriodo.values)
            Padding(
              padding: const EdgeInsets.only(right: 8),
              child: FilterChip(
                label: Text(_label(f)),
                selected: f == filtro,
                onSelected: (_) =>
                    ref.read(filtroPeriodoProvider.notifier).state = f,
              ),
            ),
        ],
      ),
    );
  }

  String _label(FiltroPeriodo f) => switch (f) {
    FiltroPeriodo.hoy => 'Hoy',
    FiltroPeriodo.semana => 'Esta semana',
    FiltroPeriodo.mes => 'Este mes',
    FiltroPeriodo.todo => 'Todo',
  };
}
```

- [ ] **Step 3: Implementar HistorialScreen**

```dart
// lib/features/historial/historial_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers/database_provider.dart';
import '../../core/providers/movimientos_provider.dart';
import 'widgets/filtro_chips.dart';
import 'widgets/movimiento_tile.dart';

class HistorialScreen extends ConsumerWidget {
  const HistorialScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final movimientosAsync = ref.watch(movimientosFiltradosProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Historial')),
      body: Column(
        children: [
          const SizedBox(height: 8),
          const FiltroChips(),
          const SizedBox(height: 8),
          Expanded(
            child: movimientosAsync.when(
              data: (movs) => movs.isEmpty
                  ? const Center(child: Text('No hay movimientos en este período'))
                  : ListView.separated(
                      itemCount: movs.length,
                      separatorBuilder: (_, __) => const Divider(height: 1),
                      itemBuilder: (_, i) => MovimientoTile(
                        movimiento: movs[i],
                        onDelete: () async {
                          final db = ref.read(databaseProvider);
                          await db.movimientosDao.borrar(movs[i].id);
                        },
                      ),
                    ),
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => Center(child: Text('Error: $e')),
            ),
          ),
        ],
      ),
    );
  }
}
```

- [ ] **Step 4: Correr y verificar**

```bash
flutter run
```

Expected: tab Historial muestra lista filtrable, swipe-to-delete funciona.

- [ ] **Step 5: Commit**

```bash
git add lib/features/historial/
git commit -m "feat: Historial screen with filter chips and swipe to delete"
```

---

## Task 12: Pantalla Resumen

**Files:**
- Modify: `lib/features/resumen/resumen_screen.dart`
- Create: `lib/features/resumen/widgets/dona_chart.dart`
- Create: `lib/features/resumen/widgets/periodo_selector.dart`

- [ ] **Step 1: dona_chart.dart**

```dart
// lib/features/resumen/widgets/dona_chart.dart
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/database/app_database.dart';
import '../../../core/models/enums.dart';
import '../../../core/providers/categorias_provider.dart';
import '../../../shared/formatters.dart';

class DonaChart extends ConsumerWidget {
  final List<Movimiento> movimientos;
  final Moneda moneda;

  const DonaChart({
    super.key,
    required this.movimientos,
    required this.moneda,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final categoriasAsync = ref.watch(categoriasProvider);
    final gastos = movimientos.where(
      (m) => m.tipo == 'gasto' && m.moneda == moneda.name,
    );
    if (gastos.isEmpty) {
      return Center(
        child: Text(
          'Sin gastos en ${moneda.name.toUpperCase()}',
          style: Theme.of(context).textTheme.bodyLarge,
        ),
      );
    }

    final Map<String, double> porCategoria = {};
    for (final m in gastos) {
      porCategoria[m.categoriaId] = (porCategoria[m.categoriaId] ?? 0) + m.monto;
    }

    final total = porCategoria.values.fold(0.0, (a, b) => a + b);
    final colors = [
      Colors.red, Colors.blue, Colors.orange, Colors.green,
      Colors.purple, Colors.teal, Colors.brown, Colors.pink,
    ];

    return categoriasAsync.when(
      data: (cats) {
        final entries = porCategoria.entries.toList()
          ..sort((a, b) => b.value.compareTo(a.value));
        return Column(
          children: [
            SizedBox(
              height: 200,
              child: PieChart(PieChartData(
                sections: entries.asMap().entries.map((e) {
                  final cat = cats.firstWhere(
                    (c) => c.id == e.value.key,
                    orElse: () => cats.last,
                  );
                  return PieChartSectionData(
                    value: e.value.value,
                    title: cat.emoji,
                    titleStyle: const TextStyle(fontSize: 18),
                    color: colors[e.key % colors.length],
                    radius: 80,
                  );
                }).toList(),
                centerSpaceRadius: 40,
              )),
            ),
            const SizedBox(height: 16),
            ...entries.asMap().entries.map((e) {
              final cat = cats.firstWhere(
                (c) => c.id == e.value.key,
                orElse: () => cats.last,
              );
              final pct = (e.value.value / total * 100).toStringAsFixed(1);
              return ListTile(
                leading: CircleAvatar(
                  backgroundColor: colors[e.key % colors.length].withOpacity(0.2),
                  child: Text(cat.emoji),
                ),
                title: Text(cat.nombre),
                trailing: Text(
                  '${moneda == Moneda.hnl ? formatHNL(e.value.value) : formatUSD(e.value.value)} ($pct%)',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              );
            }),
          ],
        );
      },
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => Text('Error: $e'),
    );
  }
}
```

- [ ] **Step 2: Implementar ResumenScreen**

```dart
// lib/features/resumen/resumen_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/models/enums.dart';
import '../../core/providers/movimientos_provider.dart';
import 'widgets/dona_chart.dart';

class ResumenScreen extends ConsumerWidget {
  const ResumenScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final movimientosAsync = ref.watch(movimientosFiltradosProvider);
    final filtro = ref.watch(filtroPeriodoProvider);

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Resumen'),
          bottom: const TabBar(tabs: [
            Tab(text: 'HNL (L.)'),
            Tab(text: 'USD (\$)'),
          ]),
        ),
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: SegmentedButton<FiltroPeriodo>(
                segments: const [
                  ButtonSegment(value: FiltroPeriodo.hoy, label: Text('Hoy')),
                  ButtonSegment(value: FiltroPeriodo.semana, label: Text('Semana')),
                  ButtonSegment(value: FiltroPeriodo.mes, label: Text('Mes')),
                ],
                selected: {filtro},
                onSelectionChanged: (s) =>
                    ref.read(filtroPeriodoProvider.notifier).state = s.first,
              ),
            ),
            Expanded(
              child: movimientosAsync.when(
                data: (movs) => TabBarView(children: [
                  SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: DonaChart(movimientos: movs, moneda: Moneda.hnl),
                  ),
                  SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: DonaChart(movimientos: movs, moneda: Moneda.usd),
                  ),
                ]),
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (e, _) => Center(child: Text('Error: $e')),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

- [ ] **Step 3: Correr y verificar**

```bash
flutter run
```

Expected: tab Resumen muestra gráfica de dona por categoría, tabs HNL/USD, filtro de período.

- [ ] **Step 4: Commit**

```bash
git add lib/features/resumen/
git commit -m "feat: Resumen screen with donut chart by category"
```

---

## Task 13: Pantalla Ajustes

**Files:**
- Modify: `lib/features/ajustes/ajustes_screen.dart`
- Create: `lib/features/ajustes/widgets/categoria_form.dart`

- [ ] **Step 1: categoria_form.dart**

```dart
// lib/features/ajustes/widgets/categoria_form.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';
import '../../../core/database/app_database.dart';
import '../../../core/providers/database_provider.dart';

class CategoriaForm extends ConsumerStatefulWidget {
  const CategoriaForm({super.key});

  @override
  ConsumerState<CategoriaForm> createState() => _CategoriaFormState();
}

class _CategoriaFormState extends ConsumerState<CategoriaForm> {
  final _nombreCtrl = TextEditingController();
  String _emoji = '📝';

  @override
  void dispose() {
    _nombreCtrl.dispose();
    super.dispose();
  }

  Future<void> _guardar() async {
    if (_nombreCtrl.text.trim().isEmpty) return;
    final db = ref.read(databaseProvider);
    await db.categoriasDao.insertar(CategoriasCompanion.insert(
      id: const Uuid().v4(),
      nombre: _nombreCtrl.text.trim(),
      emoji: _emoji,
      orden: const Value(100),
    ));
    if (mounted) Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Nueva categoría'),
      content: Row(
        children: [
          GestureDetector(
            onTap: () async {
              final emoji = await showDialog<String>(
                context: context,
                builder: (_) => _EmojiPicker(),
              );
              if (emoji != null) setState(() => _emoji = emoji);
            },
            child: Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Center(
                child: Text(_emoji, style: const TextStyle(fontSize: 24)),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: TextField(
              controller: _nombreCtrl,
              autofocus: true,
              decoration: const InputDecoration(
                hintText: 'Nombre de categoría',
                border: OutlineInputBorder(),
              ),
            ),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancelar'),
        ),
        FilledButton(
          onPressed: _guardar,
          child: const Text('Guardar'),
        ),
      ],
    );
  }
}

class _EmojiPicker extends StatelessWidget {
  static const _emojis = [
    '💊', '🏋️', '🎮', '✈️', '🎓', '👶', '🐕', '🌿',
    '🔧', '📱', '💻', '👗', '💄', '🎵', '📚', '🏠',
  ];

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Elige un emoji'),
      content: Wrap(
        spacing: 8,
        children: _emojis.map((e) => GestureDetector(
          onTap: () => Navigator.of(context).pop(e),
          child: Text(e, style: const TextStyle(fontSize: 32)),
        )).toList(),
      ),
    );
  }
}
```

- [ ] **Step 2: Implementar AjustesScreen**

```dart
// lib/features/ajustes/ajustes_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/models/enums.dart';
import '../../core/providers/categorias_provider.dart';
import '../../core/providers/database_provider.dart';
import '../../core/providers/settings_provider.dart';
import 'widgets/categoria_form.dart';

class AjustesScreen extends ConsumerWidget {
  const AjustesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final monedaDefault = ref.watch(monedaDefaultProvider);
    final categoriasAsync = ref.watch(categoriasProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Ajustes')),
      body: ListView(
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(16, 16, 16, 4),
            child: Text('PREFERENCIAS',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
          ),
          ListTile(
            title: const Text('Moneda default'),
            subtitle: Text(monedaDefault.name.toUpperCase()),
            trailing: SegmentedButton<Moneda>(
              segments: const [
                ButtonSegment(value: Moneda.hnl, label: Text('HNL')),
                ButtonSegment(value: Moneda.usd, label: Text('USD')),
              ],
              selected: {monedaDefault},
              onSelectionChanged: (s) =>
                  ref.read(monedaDefaultProvider.notifier).set(s.first),
            ),
          ),
          const Divider(),
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 4),
            child: Row(
              children: [
                const Expanded(
                  child: Text('CATEGORÍAS',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
                ),
                TextButton.icon(
                  icon: const Icon(Icons.add, size: 16),
                  label: const Text('Nueva'),
                  onPressed: () => showDialog(
                    context: context,
                    builder: (_) => const CategoriaForm(),
                  ),
                ),
              ],
            ),
          ),
          categoriasAsync.when(
            data: (cats) => Column(
              children: cats.map((c) => ListTile(
                leading: Text(c.emoji, style: const TextStyle(fontSize: 24)),
                title: Text(c.nombre),
                trailing: c.esDefault
                    ? null
                    : IconButton(
                        icon: const Icon(Icons.delete_outline, color: Colors.red),
                        onPressed: () async {
                          final db = ref.read(databaseProvider);
                          await db.categoriasDao.borrar(c.id);
                        },
                      ),
              )).toList(),
            ),
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (e, _) => Text('Error: $e'),
          ),
        ],
      ),
    );
  }
}
```

- [ ] **Step 3: Correr y verificar**

```bash
flutter run
```

Expected: tab Ajustes muestra moneda default selector, lista de categorías, botón nueva categoría, delete en categorías custom.

- [ ] **Step 4: Commit**

```bash
git add lib/features/ajustes/
git commit -m "feat: Ajustes screen — moneda default y gestión de categorías"
```

---

## Task 14: Build release y verificación final

- [ ] **Step 1: Correr todos los tests**

```bash
flutter test
```

Expected: todos los tests PASS. 0 failures.

- [ ] **Step 2: Verificar análisis estático**

```bash
flutter analyze
```

Expected: `No issues found!` o solo warnings menores.

- [ ] **Step 3: Build APK debug**

```bash
flutter build apk --debug
```

Expected: `Built build/app/outputs/flutter-apk/app-debug.apk`

- [ ] **Step 4: Checklist de Definition of Done**

Probar manualmente en dispositivo o emulador:
- [ ] Registrar gasto en <30 segundos desde cold start
- [ ] Balance se actualiza inmediatamente al guardar
- [ ] Historial muestra movimiento recién guardado
- [ ] Resumen muestra gráfica correcta
- [ ] Swipe-to-delete elimina movimiento
- [ ] Ajustes: crear y borrar categoría custom
- [ ] Cerrar y reabrir app — datos persisten
- [ ] Activar modo avión — todo funciona offline

- [ ] **Step 5: Commit final**

```bash
git add .
git commit -m "feat: MVP completo — 5 pantallas, offline-first, HNL/USD, bolsillos"
```

---

## Self-Review

**Spec coverage:**
- ✅ Home con balance por bolsillo y moneda → Task 9
- ✅ Agregar movimiento en 4 taps → Task 10
- ✅ Historial con filtros → Task 11
- ✅ Resumen con gráfica de dona → Task 12
- ✅ Ajustes con moneda default y categorías → Task 13
- ✅ Offline-first SQLite → Tasks 3-5
- ✅ Multi-moneda HNL/USD → Tasks 2, 10, 12
- ✅ Bolsillos (efectivo/Tigo/banco) → Tasks 5, 9
- ✅ Categorías default + custom → Tasks 4, 13
- ✅ Sin login → Task 6 (main.dart sin auth)

**Tipos consistentes:**
- `BalanceBolsillo` definido en Task 2, usado en Tasks 5, 9 ✅
- `MetodoPago.name` como string en DB, consistente en Tasks 5 y 10 ✅
- `Moneda.name` como string en DB, consistente en Tasks 2, 10, 12 ✅
- `FiltroPeriodo` definido en Task 6, usado en Tasks 11, 12 ✅
