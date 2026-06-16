import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/providers/settings_provider.dart';
import '../../shared/app_colors.dart';
import '../../shared/widgets/app_scaffold.dart';
import 'onboarding_widgets.dart';

// ── Plan enum ─────────────────────────────────────────────────────────────────

enum _Plan { weekly, annual, monthly }

// ── Main screen ──────────────────────────────────────────────────────────────

class SuscripcionScreen extends ConsumerStatefulWidget {
  const SuscripcionScreen({super.key});

  @override
  ConsumerState<SuscripcionScreen> createState() => _SuscripcionScreenState();
}

class _SuscripcionScreenState extends ConsumerState<SuscripcionScreen>
    with TickerProviderStateMixin {

  // ── Content stagger controller ───────────────────────────────────────────
  late final AnimationController _ctrl;
  late final Animation<double> _fBadge;
  late final Animation<double> _fHead, _fSub;
  late final Animation<Offset>  _sHead, _sSub;
  late final Animation<double> _fF1, _fF2, _fF3;
  late final Animation<double> _fPricing, _fHint;

  // ── State ────────────────────────────────────────────────────────────────
  _Plan _selectedPlan = _Plan.annual;
  bool  _btnVisible   = false;
  bool  _loading      = false;

  // ── Plan metadata ────────────────────────────────────────────────────────
  String get _ctaLabel => 'Probar 3 días gratis →';

  String get _microCopy {
    switch (_selectedPlan) {
      case _Plan.weekly:  return '3 días gratis · luego \$1.99/semana · cancela cuando quieras';
      case _Plan.annual:  return 'luego \$24.99/año · cancela cuando quieras';
      case _Plan.monthly: return '3 días gratis · luego \$4.99/mes · cancela cuando quieras';
    }
  }

  String get _priceHint {
    switch (_selectedPlan) {
      case _Plan.weekly:  return 'Semanal: 3 días gratis, luego \$1.99/semana';
      case _Plan.annual:  return 'Anual: prueba 3 días gratis, luego \$24.99/año';
      case _Plan.monthly: return 'Mensual: 3 días gratis, luego \$4.99/mes';
    }
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────

  @override
  void initState() {
    super.initState();

    _ctrl = AnimationController(duration: kOnboardingDuration, vsync: this);

    // Stagger: every element offset by ~0.08
    _fBadge   = oFade(_ctrl, 0.00, 0.25);
    _fHead    = oFade(_ctrl, 0.08, 0.36); _sHead = oSlide(_ctrl, 0.08, 0.36);
    _fSub     = oFade(_ctrl, 0.16, 0.44); _sSub  = oSlide(_ctrl, 0.16, 0.44);
    _fF1      = oFade(_ctrl, 0.26, 0.54);
    _fF2      = oFade(_ctrl, 0.34, 0.62);
    _fF3      = oFade(_ctrl, 0.42, 0.70);
    _fPricing = oFade(_ctrl, 0.50, 0.78);
    _fHint    = oFade(_ctrl, 0.60, 0.86);

    WidgetsBinding.instance.addPostFrameCallback((_) {
      // 380ms = route transition from Feature Tour
      Future.delayed(const Duration(milliseconds: 380), () {
        if (!mounted) return;
        _ctrl.forward();
        // Button slides in 340ms after content starts
        Future.delayed(const Duration(milliseconds: 340), () {
          if (mounted) setState(() => _btnVisible = true);
        });
      });
    });
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  // ── Navigation ───────────────────────────────────────────────────────────

  Future<void> _onContinue() async {
    if (_loading) return;
    HapticFeedback.mediumImpact();
    setState(() => _loading = true);
    await ref.read(onboardingCompleteProvider.notifier).markComplete();
    if (!mounted) return;
    Navigator.of(context).pushReplacement(PageRouteBuilder(
      pageBuilder: (_, __, ___) => const AppScaffold(),
      transitionsBuilder: kOnboardingTransition,
      transitionDuration: kOnboardingTransitionDuration,
    ));
  }

  Future<void> _onSkip() async {
    HapticFeedback.selectionClick();
    await ref.read(onboardingCompleteProvider.notifier).markComplete();
    if (!mounted) return;
    Navigator.of(context).pushReplacement(PageRouteBuilder(
      pageBuilder: (_, __, ___) => const AppScaffold(),
      transitionsBuilder: kOnboardingTransition,
      transitionDuration: kOnboardingTransitionDuration,
    ));
  }

  // ── Build ────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final safeBottom = MediaQuery.of(context).padding.bottom;

    return Scaffold(
      backgroundColor: const Color(0xFF0B1C30),
      resizeToAvoidBottomInset: false,
      body: Stack(
        children: [
          // ── Ambient emerald glow top ────────────────────────────────────
          Positioned.fill(
            child: IgnorePointer(
              child: Container(
                decoration: BoxDecoration(
                  gradient: RadialGradient(
                    center: const Alignment(0, -0.85),
                    radius: 1.1,
                    colors: [
                      KaxaColors.accent.withValues(alpha: 0.07),
                      Colors.transparent,
                    ],
                  ),
                ),
              ),
            ),
          ),

          // ── Main content ────────────────────────────────────────────────
          SafeArea(
            bottom: false,
            child: Column(
              children: [

                // Header — progress 100%, no skip button
                Padding(
                  padding: const EdgeInsets.fromLTRB(28, 20, 28, 0),
                  child: OnboardingHeader(
                    currentStep: 3,
                    totalSteps: 4,
                    onSkip: null,
                  ),
                ),

                // Scrollable content area
                Expanded(
                  child: SingleChildScrollView(
                    physics: const BouncingScrollPhysics(),
                    padding: const EdgeInsets.fromLTRB(24, 20, 24, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [

                        // ── Badge ─────────────────────────────────────────
                        FadeTransition(opacity: _fBadge, child: _Badge()),
                        const SizedBox(height: 20),

                        // ── Headline ──────────────────────────────────────
                        FadeTransition(
                          opacity: _fHead,
                          child: SlideTransition(
                            position: _sHead,
                            child: _Headline(),
                          ),
                        ),
                        const SizedBox(height: 10),

                        // ── Subline ───────────────────────────────────────
                        FadeTransition(
                          opacity: _fSub,
                          child: SlideTransition(
                            position: _sSub,
                            child: _Subline(),
                          ),
                        ),
                        const SizedBox(height: 22),

                        // ── Feature 1 (from Variant B) ────────────────────
                        FadeTransition(
                          opacity: _fF1,
                          child: const _FeatureRow(
                            icon: Icons.bar_chart_rounded,
                            iconColor: Color(0xFFF43F5E),
                            iconBg: Color(0x1AF43F5E),
                            title: 'Deja de adivinar',
                            desc: 'Mira tu dinero moverse en tiempo real, '
                                'no al final del mes cuando ya es tarde.',
                          ),
                        ),
                        const SizedBox(height: 10),

                        // ── Feature 2 (from Variant A) ────────────────────
                        FadeTransition(
                          opacity: _fF2,
                          child: const _FeatureRow(
                            icon: Icons.notifications_active_rounded,
                            iconColor: Color(0xFFF59E0B),
                            iconBg: Color(0x1AF59E0B),
                            title: 'Alerta antes del límite',
                            desc: 'Te avisamos cuando estás por pasarte'
                                ' — antes, no después.',
                          ),
                        ),
                        const SizedBox(height: 10),

                        // ── Feature 3 (from Variant A) ────────────────────
                        FadeTransition(
                          opacity: _fF3,
                          child: const _FeatureRow(
                            icon: Icons.check_circle_rounded,
                            iconColor: Color(0xFF3B82F6),
                            iconBg: Color(0x1A3B82F6),
                            title: 'Cierra el mes en verde',
                            desc: 'Ajusta sobre la marcha. '
                                'Sin sorpresas al final del mes.',
                          ),
                        ),
                        const SizedBox(height: 24),

                        // ── Pricing ───────────────────────────────────────
                        FadeTransition(
                          opacity: _fPricing,
                          child: _PricingSection(
                            selected: _selectedPlan,
                            onSelect: (p) {
                              HapticFeedback.selectionClick();
                              setState(() => _selectedPlan = p);
                            },
                          ),
                        ),
                        const SizedBox(height: 10),

                        // ── Price hint — updates with selected plan ────────
                        FadeTransition(
                          opacity: _fHint,
                          child: AnimatedSwitcher(
                            duration: const Duration(milliseconds: 220),
                            transitionBuilder: (child, anim) =>
                                FadeTransition(opacity: anim, child: child),
                            child: Text(
                              _priceHint,
                              key: ValueKey(_priceHint),
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 11,
                                color: Colors.white.withValues(alpha: 0.35),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),
                      ],
                    ),
                  ),
                ),

                // ── Fixed CTA — slides in after route transition ──────────
                AnimatedSlide(
                  offset: _btnVisible ? Offset.zero : const Offset(0, 0.28),
                  duration: const Duration(milliseconds: 360),
                  curve: Curves.easeOutCubic,
                  child: AnimatedOpacity(
                    opacity: _btnVisible ? 1.0 : 0.0,
                    duration: const Duration(milliseconds: 300),
                    curve: Curves.easeOut,
                    child: _CtaSection(
                      ctaLabel: _ctaLabel,
                      microCopy: _microCopy,
                      loading: _loading,
                      onContinue: _onContinue,
                      onRestore: () {
                        // TODO: restore purchases
                      },
                      onSkip: _onSkip,
                      safeBottom: safeBottom,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ── Sub-widgets ────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

// ── Badge ─────────────────────────────────────────────────────────────────────

class _Badge extends StatelessWidget {
  const _Badge();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
      decoration: BoxDecoration(
        color: KaxaColors.accent.withValues(alpha: 0.10),
        border: Border.all(
            color: KaxaColors.accent.withValues(alpha: 0.30), width: 1),
        borderRadius: BorderRadius.circular(99),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 6, height: 6,
            decoration: BoxDecoration(
              color: KaxaColors.accent,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: KaxaColors.accent.withValues(alpha: 0.85),
                  blurRadius: 7, spreadRadius: 0,
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Text(
            'KAXA PRO',
            style: TextStyle(
              fontSize: 10, fontWeight: FontWeight.w700,
              color: KaxaColors.accent, letterSpacing: 2.2,
            ),
          ),
        ],
      ),
    );
  }
}

// ── Headline ──────────────────────────────────────────────────────────────────

class _Headline extends StatelessWidget {
  const _Headline();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          child: Text(
            'Ya sabes cuánto gastas.',
            textAlign: TextAlign.center,
            style: GoogleFonts.spaceGrotesk(
              fontSize: 34, fontWeight: FontWeight.w800,
              height: 1.06, letterSpacing: -0.9,
              color: Colors.white.withValues(alpha: 0.88),
            ),
          ),
        ),
        SizedBox(
          width: double.infinity,
          child: Text(
            'Ahora contrólalo.',
            textAlign: TextAlign.center,
            style: GoogleFonts.spaceGrotesk(
              fontSize: 34, fontWeight: FontWeight.w800,
              height: 1.06, letterSpacing: -0.9,
              color: KaxaColors.accent,
            ),
          ),
        ),
      ],
    );
  }
}

// ── Subline ───────────────────────────────────────────────────────────────────

class _Subline extends StatelessWidget {
  const _Subline();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Text(
        'El 73% de usuarios Kaxa evitan cerrar el mes en rojo '
        'en sus primeros 30 días.',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 13, height: 1.6,
          color: Colors.white.withValues(alpha: 0.48),
        ),
      ),
    );
  }
}

// ── Feature row ───────────────────────────────────────────────────────────────

class _FeatureRow extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final Color iconBg;
  final String title;
  final String desc;

  const _FeatureRow({
    required this.icon,
    required this.iconColor,
    required this.iconBg,
    required this.title,
    required this.desc,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 14, 14, 14),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.04),
        border: Border.all(
            color: Colors.white.withValues(alpha: 0.07), width: 1),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Icon badge
          Container(
            width: 38, height: 38,
            decoration: BoxDecoration(
              color: iconBg,
              borderRadius: BorderRadius.circular(11),
            ),
            child: Icon(icon, color: iconColor, size: 19),
          ),
          const SizedBox(width: 13),
          // Text
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 13, fontWeight: FontWeight.w700,
                    color: Colors.white.withValues(alpha: 0.88),
                    height: 1.2,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  desc,
                  style: TextStyle(
                    fontSize: 12, height: 1.55,
                    color: Colors.white.withValues(alpha: 0.48),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ── Pricing section ───────────────────────────────────────────────────────────

class _PricingSection extends StatelessWidget {
  final _Plan selected;
  final ValueChanged<_Plan> onSelect;

  const _PricingSection({
    required this.selected,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Label
        Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: Text(
            'ELIGE TU PLAN',
            style: TextStyle(
              fontSize: 10, fontWeight: FontWeight.w700,
              color: Colors.white.withValues(alpha: 0.28),
              letterSpacing: 2.2,
            ),
          ),
        ),

        // 3 plan cards — all wrapped with top padding so annual badge floats
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Semanal
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(top: 11),
                child: _PlanCard(
                  plan: _Plan.weekly,
                  selected: selected == _Plan.weekly,
                  name: 'Semanal',
                  price: '\$1.99',
                  per: '/semana',
                  tag: '3 días gratis',
                  tagColor: null,
                  onTap: () => onSelect(_Plan.weekly),
                ),
              ),
            ),
            const SizedBox(width: 8),

            // Anual — featured with floating badge
            Expanded(
              child: _FeaturedPlanCard(
                selected: selected == _Plan.annual,
                onTap: () => onSelect(_Plan.annual),
              ),
            ),
            const SizedBox(width: 8),

            // Mensual
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(top: 11),
                child: _PlanCard(
                  plan: _Plan.monthly,
                  selected: selected == _Plan.monthly,
                  name: 'Mensual',
                  price: '\$4.99',
                  per: '/mes',
                  tag: 'Flexible',
                  tagColor: null,
                  onTap: () => onSelect(_Plan.monthly),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

// ── Plan card (Semanal / Mensual) ─────────────────────────────────────────────

class _PlanCard extends StatefulWidget {
  final _Plan plan;
  final bool selected;
  final String name;
  final String price;
  final String per;
  final String tag;
  final Color? tagColor;
  final VoidCallback onTap;

  const _PlanCard({
    required this.plan,
    required this.selected,
    required this.name,
    required this.price,
    required this.per,
    required this.tag,
    required this.tagColor,
    required this.onTap,
  });

  @override
  State<_PlanCard> createState() => _PlanCardState();
}

class _PlanCardState extends State<_PlanCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _press;
  late final Animation<double>   _scale;

  @override
  void initState() {
    super.initState();
    _press = AnimationController(
        vsync: this,
        duration: const Duration(milliseconds: 80),
        reverseDuration: const Duration(milliseconds: 220));
    _scale = Tween(begin: 1.0, end: 0.93)
        .animate(CurvedAnimation(parent: _press, curve: Curves.easeOut));
  }

  @override
  void dispose() { _press.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final sel = widget.selected;

    return GestureDetector(
      onTapDown:  (_) => _press.forward(),
      onTapUp:    (_) { _press.reverse(); widget.onTap(); },
      onTapCancel: () => _press.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 240),
          curve: Curves.easeOutCubic,
          padding: const EdgeInsets.fromLTRB(11, 13, 11, 13),
          decoration: BoxDecoration(
            color: sel
                ? KaxaColors.accent.withValues(alpha: 0.12)
                : Colors.white.withValues(alpha: 0.04),
            border: Border.all(
              color: sel
                  ? KaxaColors.accent.withValues(alpha: 0.55)
                  : Colors.white.withValues(alpha: 0.10),
              width: sel ? 1.5 : 1.0,
            ),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.name,
                style: TextStyle(
                  fontSize: 10, fontWeight: FontWeight.w700,
                  letterSpacing: 0.6,
                  color: sel
                      ? KaxaColors.accent
                      : Colors.white.withValues(alpha: 0.55),
                ),
              ),
              const SizedBox(height: 5),
              Text(
                widget.price,
                style: GoogleFonts.spaceGrotesk(
                  fontSize: 21, fontWeight: FontWeight.w800, letterSpacing: -0.4,
                  color: sel ? KaxaColors.accent : Colors.white,
                ),
              ),
              Text(
                widget.per,
                style: TextStyle(
                  fontSize: 9,
                  color: Colors.white.withValues(alpha: 0.36),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                widget.tag,
                style: TextStyle(
                  fontSize: 9, fontWeight: FontWeight.w600,
                  color: sel
                      ? KaxaColors.accent
                      : Colors.white.withValues(alpha: 0.40),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ── Featured plan card (Anual) ────────────────────────────────────────────────

class _FeaturedPlanCard extends StatefulWidget {
  final bool selected;
  final VoidCallback onTap;

  const _FeaturedPlanCard({
    required this.selected,
    required this.onTap,
  });

  @override
  State<_FeaturedPlanCard> createState() => _FeaturedPlanCardState();
}

class _FeaturedPlanCardState extends State<_FeaturedPlanCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _press;
  late final Animation<double>   _scale;

  @override
  void initState() {
    super.initState();
    _press = AnimationController(
        vsync: this,
        duration: const Duration(milliseconds: 80),
        reverseDuration: const Duration(milliseconds: 220));
    _scale = Tween(begin: 1.0, end: 0.93)
        .animate(CurvedAnimation(parent: _press, curve: Curves.easeOut));
  }

  @override
  void dispose() { _press.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final sel = widget.selected;

    return GestureDetector(
      onTapDown:  (_) => _press.forward(),
      onTapUp:    (_) { _press.reverse(); widget.onTap(); },
      onTapCancel: () => _press.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: Stack(
          clipBehavior: Clip.none,
          children: [

            // ── Floating badge ──────────────────────────────────────────
            Positioned(
              top: 1, left: 0, right: 0,
              child: Center(
                child: Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 9, vertical: 3),
                  decoration: BoxDecoration(
                    color: KaxaColors.accent,
                    borderRadius: BorderRadius.circular(99),
                    boxShadow: [
                      BoxShadow(
                        color: KaxaColors.accent.withValues(alpha: 0.45),
                        blurRadius: 8, offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: const Text(
                    '✦  MEJOR VALOR',
                    style: TextStyle(
                      fontSize: 8, fontWeight: FontWeight.w800,
                      color: Colors.white, letterSpacing: 1.0,
                    ),
                  ),
                ),
              ),
            ),

            // ── Card ─────────────────────────────────────────────────────
            AnimatedContainer(
              duration: const Duration(milliseconds: 240),
              curve: Curves.easeOutCubic,
              margin: const EdgeInsets.only(top: 11),
              padding: const EdgeInsets.fromLTRB(11, 13, 11, 13),
              decoration: BoxDecoration(
                color: sel
                    ? KaxaColors.accent.withValues(alpha: 0.16)
                    : KaxaColors.accent.withValues(alpha: 0.10),
                border: Border.all(
                  color: sel
                      ? KaxaColors.accent
                      : KaxaColors.accent.withValues(alpha: 0.60),
                  width: sel ? 2.0 : 1.5,
                ),
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: KaxaColors.accent.withValues(alpha: sel ? 0.18 : 0.08),
                    blurRadius: sel ? 20 : 10,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Anual',
                    style: const TextStyle(
                      fontSize: 10, fontWeight: FontWeight.w700,
                      letterSpacing: 0.6, color: KaxaColors.accent,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    '\$24.99',
                    style: GoogleFonts.spaceGrotesk(
                      fontSize: 21, fontWeight: FontWeight.w800,
                      letterSpacing: -0.4, color: KaxaColors.accent,
                    ),
                  ),
                  Text(
                    '/año · \$2.08/mes',
                    style: TextStyle(
                      fontSize: 9,
                      color: Colors.white.withValues(alpha: 0.36),
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    '−58% vs mensual',
                    style: TextStyle(
                      fontSize: 9, fontWeight: FontWeight.w700,
                      color: KaxaColors.accent,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ── CTA section ───────────────────────────────────────────────────────────────

class _CtaSection extends StatelessWidget {
  final String ctaLabel;
  final String microCopy;
  final bool loading;
  final VoidCallback onContinue;
  final VoidCallback onRestore;
  final VoidCallback onSkip;
  final double safeBottom;

  const _CtaSection({
    required this.ctaLabel,
    required this.microCopy,
    required this.loading,
    required this.onContinue,
    required this.onRestore,
    required this.onSkip,
    required this.safeBottom,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(24, 12, 24, safeBottom + 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [

          // ── CTA button with emerald glow ─────────────────────────────
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(99),
              boxShadow: [
                BoxShadow(
                  color: KaxaColors.accent.withValues(alpha: 0.32),
                  blurRadius: 24, offset: const Offset(0, 8),
                ),
              ],
            ),
            child: SizedBox(
              width: double.infinity,
              height: 56,
              child: FilledButton(
                onPressed: loading ? null : onContinue,
                style: FilledButton.styleFrom(
                  backgroundColor: KaxaColors.accent,
                  disabledBackgroundColor:
                      KaxaColors.accent.withValues(alpha: 0.60),
                  foregroundColor: Colors.white,
                  shape: const StadiumBorder(),
                  textStyle: const TextStyle(
                      fontSize: 16, fontWeight: FontWeight.w700,
                      letterSpacing: 0.2),
                ),
                child: loading
                    ? const SizedBox(
                        width: 20, height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2, color: Colors.white))
                    : Text(ctaLabel),
              ),
            ),
          ),
          const SizedBox(height: 9),

          // ── Micro-copy — crossfades on plan change ────────────────────
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 220),
            transitionBuilder: (child, anim) =>
                FadeTransition(opacity: anim, child: child),
            child: Text(
              microCopy,
              key: ValueKey(microCopy),
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 11, height: 1.45,
                color: Colors.white.withValues(alpha: 0.32),
              ),
            ),
          ),
          const SizedBox(height: 12),

          // ── Restore + skip row ───────────────────────────────────────
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              GestureDetector(
                onTap: onRestore,
                child: Text(
                  'Restaurar compras',
                  style: TextStyle(
                    fontSize: 12, fontWeight: FontWeight.w600,
                    color: Colors.white.withValues(alpha: 0.38),
                    decoration: TextDecoration.underline,
                    decorationColor: Colors.white.withValues(alpha: 0.25),
                  ),
                ),
              ),
              Text(
                '  ·  ',
                style: TextStyle(
                    fontSize: 12,
                    color: Colors.white.withValues(alpha: 0.20)),
              ),
              GestureDetector(
                onTap: onSkip,
                child: Text(
                  'Ahora no',
                  style: TextStyle(
                    fontSize: 12, fontWeight: FontWeight.w600,
                    color: Colors.white.withValues(alpha: 0.28),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
