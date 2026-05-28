# Kaxa Visual Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar la identidad visual de Kaxa (blanco dominante, esmeralda `#10B981`, Nunito) a la app Flutter existente y renombrar la app de "Mi Caja" a "Kaxa".

**Architecture:** Todos los cambios son estéticos — sin tocar lógica de negocio, DB, ni providers. Flujo: constantes de color → theme global → componentes individuales. El tema Material 3 propaga la mayoría de los cambios automáticamente.

**Tech Stack:** Flutter · Material 3 · google_fonts (Nunito) · flutter_launcher_icons (ícono) · Stitch MCP (generación del ícono)

---

## Mapa de Archivos

```
mi_caja/
├── pubspec.yaml                          # +google_fonts, +flutter_launcher_icons
├── android/app/src/main/
│   └── AndroidManifest.xml              # android:label="Kaxa"
├── lib/
│   ├── app.dart                          # title: 'Kaxa'
│   ├── shared/
│   │   ├── app_colors.dart              # NUEVO — constantes de color
│   │   └── theme.dart                   # reescribir con Nunito + paleta Kaxa
│   ├── features/
│   │   ├── home/
│   │   │   ├── home_screen.dart         # título 'Kaxa', FAB colors spec
│   │   │   └── widgets/
│   │   │       ├── balance_card.dart    # card blanca minimalista
│   │   │       └── bolsillos_row.dart   # chips con paleta Kaxa
│   │   └── historial/
│   │       └── widgets/
│   │           └── movimiento_tile.dart # Colors.red/green → constantes Kaxa
└── flutter_launcher_icons.yaml          # NUEVO — config ícono
```

**No cambian:** toda la lógica de DB, providers, modelos, pantallas de Agregar/Historial/Resumen/Ajustes (heredan el tema automáticamente).

---

## Task 1: Dependencias + nombre de app

**Files:**
- Modify: `pubspec.yaml`
- Modify: `android/app/src/main/AndroidManifest.xml`

- [ ] **Step 1: Agregar google_fonts y flutter_launcher_icons a pubspec.yaml**

```yaml
# pubspec.yaml — sección dependencies (agregar debajo de shared_preferences)
  google_fonts: ^6.2.1

# pubspec.yaml — sección dev_dependencies (agregar debajo de flutter_lints)
  flutter_launcher_icons: ^0.13.1
```

El archivo completo de dependencias queda:
```yaml
dependencies:
  flutter:
    sdk: flutter
  drift: ^2.18.0
  sqlite3_flutter_libs: ^0.5.24
  path_provider: ^2.1.3
  path: ^1.9.0
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5
  fl_chart: ^0.68.0
  uuid: ^4.4.0
  intl: ^0.19.0
  shared_preferences: ^2.2.3
  google_fonts: ^6.2.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  drift_dev: ^2.18.0
  build_runner: ^2.4.11
  riverpod_generator: ^2.4.3
  flutter_lints: ^4.0.0
  flutter_launcher_icons: ^0.13.1
```

- [ ] **Step 2: Renombrar app en AndroidManifest.xml**

Archivo: `android/app/src/main/AndroidManifest.xml`

Buscar la línea con `android:label` en el tag `<application>` y cambiarla a:
```xml
android:label="Kaxa"
```

- [ ] **Step 3: Instalar dependencias**

```bash
flutter pub get
```

Expected: `Got dependencies!` sin errores.

- [ ] **Step 4: Verificar que google_fonts se importa correctamente**

```bash
flutter pub deps | grep google_fonts
```

Expected: `google_fonts` aparece en la lista.

- [ ] **Step 5: Commit**

```bash
git add pubspec.yaml pubspec.lock android/app/src/main/AndroidManifest.xml
git commit -m "feat: add google_fonts + flutter_launcher_icons, rename app to Kaxa"
```

---

## Task 2: Constantes de color

**Files:**
- Create: `lib/shared/app_colors.dart`

- [ ] **Step 1: Crear archivo de constantes**

```dart
// lib/shared/app_colors.dart
import 'package:flutter/material.dart';

/// Paleta oficial de Kaxa
/// Blanco dominante + acento esmeralda #10B981
abstract final class KaxaColors {
  // Fondos
  static const background = Color(0xFFFFFFFF);
  static const surface = Color(0xFFF9FAFB);
  static const surfaceBorder = Color(0xFFE5E7EB);

  // Primario — Emerald 500
  static const primary = Color(0xFF10B981);
  static const primaryDark = Color(0xFF059669);
  static const primaryLight = Color(0xFFD1FAE5);

  // Texto
  static const textPrimary = Color(0xFF111827);
  static const textSecondary = Color(0xFF6B7280);
  static const textDisabled = Color(0xFFD1D5DB);

  // Semánticos
  static const gasto = Color(0xFFEF4444);
  static const gastoLight = Color(0xFFFEE2E2);
  static const ingreso = Color(0xFF10B981);
  static const ingresoLight = Color(0xFFD1FAE5);

  // Utilidades
  static const white = Color(0xFFFFFFFF);
}
```

- [ ] **Step 2: Verificar que compila**

```bash
flutter analyze lib/shared/app_colors.dart
```

Expected: `No issues found!`

- [ ] **Step 3: Commit**

```bash
git add lib/shared/app_colors.dart
git commit -m "feat: KaxaColors constants — emerald/white palette"
```

---

## Task 3: Theme — Nunito + paleta Kaxa

**Files:**
- Modify: `lib/shared/theme.dart`

- [ ] **Step 1: Reescribir theme.dart**

```dart
// lib/shared/theme.dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

ThemeData buildTheme() {
  final base = ThemeData(
    colorScheme: ColorScheme.fromSeed(
      seedColor: KaxaColors.primary,
      primary: KaxaColors.primary,
      onPrimary: KaxaColors.white,
      secondary: KaxaColors.primaryDark,
      surface: KaxaColors.background,
      onSurface: KaxaColors.textPrimary,
      brightness: Brightness.light,
    ),
    useMaterial3: true,
  );

  return base.copyWith(
    // Tipografía Nunito
    textTheme: GoogleFonts.nunitoTextTheme(base.textTheme).copyWith(
      displayLarge: GoogleFonts.nunito(
        fontSize: 32,
        fontWeight: FontWeight.w800,
        color: KaxaColors.textPrimary,
      ),
      headlineMedium: GoogleFonts.nunito(
        fontSize: 28,
        fontWeight: FontWeight.w800,
        color: KaxaColors.textPrimary,
      ),
      titleLarge: GoogleFonts.nunito(
        fontSize: 22,
        fontWeight: FontWeight.w700,
        color: KaxaColors.textPrimary,
      ),
      titleMedium: GoogleFonts.nunito(
        fontSize: 16,
        fontWeight: FontWeight.w700,
        color: KaxaColors.textPrimary,
      ),
      bodyLarge: GoogleFonts.nunito(
        fontSize: 16,
        fontWeight: FontWeight.w500,
        color: KaxaColors.textPrimary,
      ),
      bodyMedium: GoogleFonts.nunito(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: KaxaColors.textSecondary,
      ),
      labelLarge: GoogleFonts.nunito(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: KaxaColors.textPrimary,
      ),
      labelSmall: GoogleFonts.nunito(
        fontSize: 11,
        fontWeight: FontWeight.w500,
        color: KaxaColors.textSecondary,
        letterSpacing: 0.5,
      ),
    ),

    // AppBar: blanco, sin elevación
    appBarTheme: AppBarTheme(
      centerTitle: false,
      backgroundColor: KaxaColors.background,
      foregroundColor: KaxaColors.textPrimary,
      elevation: 0,
      scrolledUnderElevation: 0,
      titleTextStyle: GoogleFonts.nunito(
        fontSize: 20,
        fontWeight: FontWeight.w700,
        color: KaxaColors.textPrimary,
      ),
    ),

    // Botones filled — radius 12dp
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: KaxaColors.primary,
        foregroundColor: KaxaColors.white,
        minimumSize: const Size(double.infinity, 52),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: GoogleFonts.nunito(
          fontSize: 16,
          fontWeight: FontWeight.w700,
        ),
      ),
    ),

    // Cards — blancas con borde sutil
    cardTheme: CardThemeData(
      color: KaxaColors.surface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: KaxaColors.surfaceBorder),
      ),
    ),

    // NavigationBar — blanco con acento esmeralda
    navigationBarTheme: NavigationBarThemeData(
      backgroundColor: KaxaColors.background,
      indicatorColor: KaxaColors.primaryLight,
      iconTheme: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return const IconThemeData(color: KaxaColors.primary);
        }
        return const IconThemeData(color: KaxaColors.textSecondary);
      }),
      labelTextStyle: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return GoogleFonts.nunito(
            fontSize: 12,
            fontWeight: FontWeight.w700,
            color: KaxaColors.primary,
          );
        }
        return GoogleFonts.nunito(
          fontSize: 12,
          fontWeight: FontWeight.w500,
          color: KaxaColors.textSecondary,
        );
      }),
    ),

    // Scaffold — fondo blanco
    scaffoldBackgroundColor: KaxaColors.background,

    // Chips — esmeralda cuando selected
    chipTheme: ChipThemeData(
      backgroundColor: KaxaColors.surface,
      selectedColor: KaxaColors.primaryLight,
      labelStyle: GoogleFonts.nunito(fontSize: 13, fontWeight: FontWeight.w500),
      side: const BorderSide(color: KaxaColors.surfaceBorder),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
    ),
  );
}
```

- [ ] **Step 2: Verificar que compila**

```bash
flutter analyze lib/shared/theme.dart
```

Expected: `No issues found!`

- [ ] **Step 3: Verificar que la app arranca**

```bash
flutter build apk --debug 2>&1 | tail -3
```

Expected: `✓ Built build/app/outputs/flutter-apk/app-debug.apk`

- [ ] **Step 4: Commit**

```bash
git add lib/shared/theme.dart lib/shared/app_colors.dart
git commit -m "feat: Kaxa theme — Nunito font, emerald palette, white-dominant UI"
```

---

## Task 4: app.dart + HomeScreen — renombrar a Kaxa

**Files:**
- Modify: `lib/app.dart`
- Modify: `lib/features/home/home_screen.dart`

- [ ] **Step 1: Actualizar app.dart**

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
      title: 'Kaxa',
      theme: buildTheme(),
      home: const AppScaffold(),
      debugShowCheckedModeBanner: false,
    );
  }
}
```

- [ ] **Step 2: Actualizar home_screen.dart — título y FABs**

```dart
// lib/features/home/home_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers/balance_provider.dart';
import '../../shared/app_colors.dart';
import 'widgets/balance_card.dart';
import 'widgets/bolsillos_row.dart';
import '../agregar/agregar_screen.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final balancesAsync = ref.watch(balancesProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Kaxa')),
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
            backgroundColor: KaxaColors.ingreso,
            foregroundColor: KaxaColors.white,
          ),
          const SizedBox(height: 12),
          FloatingActionButton.extended(
            heroTag: 'gasto',
            onPressed: () => _abrirAgregar(context, esGasto: true),
            icon: const Icon(Icons.remove),
            label: const Text('Gasto'),
            backgroundColor: KaxaColors.gasto,
            foregroundColor: KaxaColors.white,
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

- [ ] **Step 3: Verificar**

```bash
flutter analyze lib/app.dart lib/features/home/home_screen.dart
```

Expected: `No issues found!`

- [ ] **Step 4: Commit**

```bash
git add lib/app.dart lib/features/home/home_screen.dart
git commit -m "feat: rename app to Kaxa, update FAB colors to spec"
```

---

## Task 5: BalanceCard — diseño blanco minimalista

**Files:**
- Modify: `lib/features/home/widgets/balance_card.dart`

- [ ] **Step 1: Reescribir balance_card.dart**

El diseño actual usa `theme.colorScheme.primary` como fondo (verde oscuro). El nuevo diseño usa fondo blanco con el monto en negro bold y moneda en gris — los números son los protagonistas.

```dart
// lib/features/home/widgets/balance_card.dart
import 'package:flutter/material.dart';
import '../../../core/models/balance.dart';
import '../../../shared/app_colors.dart';
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
    final textTheme = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: KaxaColors.surface,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: KaxaColors.surfaceBorder),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Balance total',
              style: textTheme.bodyMedium?.copyWith(
                color: KaxaColors.textSecondary,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8),
            if (_totalHnl != 0)
              Text(
                formatHNL(_totalHnl),
                style: textTheme.displayLarge?.copyWith(
                  color: KaxaColors.textPrimary,
                  fontWeight: FontWeight.w800,
                ),
              ),
            if (_totalUsd != 0)
              Text(
                formatUSD(_totalUsd),
                style: textTheme.titleLarge?.copyWith(
                  color: KaxaColors.textSecondary,
                ),
              ),
            if (_totalHnl == 0 && _totalUsd == 0)
              Text(
                'Sin movimientos aún',
                style: textTheme.bodyLarge?.copyWith(
                  color: KaxaColors.textDisabled,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
```

- [ ] **Step 2: Verificar**

```bash
flutter analyze lib/features/home/widgets/balance_card.dart
```

Expected: `No issues found!`

- [ ] **Step 3: Commit**

```bash
git add lib/features/home/widgets/balance_card.dart
git commit -m "feat: BalanceCard — white minimalist design, large Nunito numbers"
```

---

## Task 6: MovimientoTile — colores Kaxa

**Files:**
- Modify: `lib/features/historial/widgets/movimiento_tile.dart`

- [ ] **Step 1: Actualizar colores y mostrar nombre de categoría**

El tile actual muestra `movimiento.nota` como título, que puede ser null → "Sin nota". Mejor mostrar el nombre de categoría como título principal y la nota como subtítulo.

```dart
// lib/features/historial/widgets/movimiento_tile.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import '../../../core/database/app_database.dart';
import '../../../core/models/enums.dart';
import '../../../core/providers/categorias_provider.dart';
import '../../../shared/app_colors.dart';
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
    final color = tipo == TipoMovimiento.gasto
        ? KaxaColors.gasto
        : KaxaColors.ingreso;
    final bgColor = tipo == TipoMovimiento.gasto
        ? KaxaColors.gastoLight
        : KaxaColors.ingresoLight;
    final signo = tipo == TipoMovimiento.gasto ? '-' : '+';

    final categoria = categoriasAsync
        .whenData(
          (cats) => cats.firstWhere(
            (c) => c.id == movimiento.categoriaId,
            orElse: () => cats.last,
          ),
        )
        .valueOrNull;

    return Dismissible(
      key: Key(movimiento.id),
      direction: DismissDirection.endToStart,
      background: Container(
        color: KaxaColors.gasto,
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 16),
        child: const Icon(Icons.delete, color: KaxaColors.white),
      ),
      onDismissed: (_) => onDelete?.call(),
      child: ListTile(
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        leading: CircleAvatar(
          backgroundColor: bgColor,
          child: Text(
            categoria?.emoji ?? '🗂️',
            style: const TextStyle(fontSize: 20),
          ),
        ),
        title: Text(
          categoria?.nombre ?? 'Categoría',
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                fontWeight: FontWeight.w600,
                color: KaxaColors.textPrimary,
              ),
        ),
        subtitle: movimiento.nota != null
            ? Text(
                movimiento.nota!,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.bodyMedium,
              )
            : Text(
                DateFormat('dd/MM/yyyy HH:mm').format(movimiento.fecha),
                style: Theme.of(context).textTheme.bodyMedium,
              ),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              '$signo ${moneda == Moneda.hnl ? formatHNL(movimiento.monto) : formatUSD(movimiento.monto)}',
              style: TextStyle(
                color: color,
                fontWeight: FontWeight.w700,
                fontSize: 15,
              ),
            ),
            if (movimiento.nota != null)
              Text(
                DateFormat('dd/MM/yy').format(movimiento.fecha),
                style: Theme.of(context).textTheme.labelSmall,
              ),
          ],
        ),
      ),
    );
  }
}
```

- [ ] **Step 2: Verificar**

```bash
flutter analyze lib/features/historial/widgets/movimiento_tile.dart
```

Expected: `No issues found!`

- [ ] **Step 3: Correr todos los tests**

```bash
flutter test
```

Expected: todos PASS.

- [ ] **Step 4: Commit**

```bash
git add lib/features/historial/widgets/movimiento_tile.dart
git commit -m "feat: MovimientoTile — Kaxa colors, category name as title"
```

---

## Task 7: App Icon — Stitch MCP + flutter_launcher_icons

**Files:**
- Create: `flutter_launcher_icons.yaml`
- Create: `assets/icon/kaxa_icon.png` (generado por Stitch)
- Modify: `pubspec.yaml` (assets)

**Contexto del ícono:** Caja geométrica con K implícita. Fondo esmeralda `#10B981`, símbolo blanco. Usar Stitch MCP con instrucciones de diseño.

- [ ] **Step 1: Crear configuración flutter_launcher_icons.yaml**

```yaml
# flutter_launcher_icons.yaml
flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/icon/kaxa_icon.png"
  min_sdk_android: 21
  adaptive_icon_background: "#10B981"
  adaptive_icon_foreground: "assets/icon/kaxa_icon_foreground.png"
```

- [ ] **Step 2: Crear directorio de assets**

```bash
mkdir -p assets/icon
```

- [ ] **Step 3: Generar ícono con Stitch MCP**

Usar Stitch MCP con el siguiente prompt de diseño:

```
Create a minimalist app icon for "Kaxa" — a personal finance app.
Design: A geometric square with rounded corners (22% radius).
Background: solid emerald green #10B981.
Symbol: White geometric shape that creates an implicit "K" letter 
through negative space — three white geometric elements (one vertical 
bar on the left, two diagonal bars on the right) forming a K shape.
Style: Clean, modern, flat design. No gradients, no shadows.
The K should occupy 60% of the icon area, centered.
Output: 1024x1024 PNG
```

Guardar el resultado como `assets/icon/kaxa_icon.png` y `assets/icon/kaxa_icon_foreground.png`.

- [ ] **Step 4: Declarar assets en pubspec.yaml**

```yaml
# En la sección flutter: de pubspec.yaml, agregar:
flutter:
  uses-material-design: true
  assets:
    - assets/icon/
```

- [ ] **Step 5: Generar íconos de launcher**

```bash
dart run flutter_launcher_icons
```

Expected: output indicando que los íconos fueron generados en `android/app/src/main/res/`.

- [ ] **Step 6: Verificar build**

```bash
flutter build apk --debug 2>&1 | tail -3
```

Expected: `✓ Built build/app/outputs/flutter-apk/app-debug.apk`

- [ ] **Step 7: Instalar y verificar ícono en dispositivo**

```bash
adb install -r build/app/outputs/flutter-apk/app-debug.apk
```

Verificar en el launcher del dispositivo que el ícono aparece correcto.

- [ ] **Step 8: Commit**

```bash
git add flutter_launcher_icons.yaml assets/ pubspec.yaml android/app/src/main/res/
git commit -m "feat: Kaxa app icon — emerald background, geometric K symbol"
```

---

## Task 8: Verificación final

**Files:** Ninguno — solo verificación.

- [ ] **Step 1: Correr todos los tests**

```bash
flutter test
```

Expected: todos PASS.

- [ ] **Step 2: Análisis estático**

```bash
flutter analyze
```

Expected: `No issues found!`

- [ ] **Step 3: Build final**

```bash
flutter build apk --debug 2>&1 | tail -3
```

Expected: `✓ Built build/app/outputs/flutter-apk/app-debug.apk`

- [ ] **Step 4: Instalar y verificar visualmente en dispositivo**

```bash
adb install -r build/app/outputs/flutter-apk/app-debug.apk
```

Checklist visual:
- [ ] AppBar blanco, título "Kaxa" en Nunito
- [ ] BalanceCard fondo claro, número grande en negro
- [ ] FAB Ingreso verde esmeralda, FAB Gasto rojo
- [ ] NavigationBar blanco, íconos activos esmeralda
- [ ] MovimientoTile: gastos en rojo, ingresos en verde
- [ ] Fuente Nunito visible en toda la app
- [ ] Ícono de app actualizado en launcher

- [ ] **Step 5: Commit final**

```bash
git add .
git commit -m "feat: Kaxa visual identity complete — white/emerald/Nunito"
```

---

## Self-Review

**Spec coverage:**
- ✅ Paleta blanco dominante → Tasks 3, 5 (BalanceCard)
- ✅ Acento `#10B981` esmeralda → Task 2 (KaxaColors), Task 3 (theme seed)
- ✅ Tipografía Nunito → Task 3 (theme textTheme)
- ✅ Nombre "Kaxa" → Tasks 1 (AndroidManifest), 4 (app.dart + HomeScreen)
- ✅ Logo/ícono caja + K implícita → Task 7 (Stitch + flutter_launcher_icons)
- ✅ FABs spec colors → Task 4 (HomeScreen)
- ✅ Cards con borde sutil → Task 3 (cardTheme), Task 5 (BalanceCard)
- ✅ NavigationBar esmeralda → Task 3 (navigationBarTheme)
- ✅ MovimientoTile colores → Task 6

**Tipos consistentes:**
- `KaxaColors.primary` definido en Task 2, usado en Tasks 3, 4, 5, 6 ✅
- `KaxaColors.gasto` / `KaxaColors.ingreso` definidos en Task 2, usados en Task 4 y 6 ✅
- `buildTheme()` modificado en Task 3, consumido por `app.dart` (sin cambios necesarios) ✅
