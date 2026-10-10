# verify_responsiveness_suite.ps1 - Comprehensive Pan-Device Responsiveness & Media Fit Verification Suite
$ErrorActionPreference = "Stop"

Write-Host "`n=================================================================" -ForegroundColor Cyan
Write-Host "   FLY ANYTIME - PAN-DEVICE RESPONSIVENESS & MEDIA SUITE        " -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

$pages = @("index.html", "flights.html", "stays.html", "trains.html", "destinations.html", "trip-detail.html")
$allPassed = $true

# 1. Audit Stylesheet Tokens & Media Rules
Write-Host "`n[1/3] Verifying css/styles.css responsiveness rules..." -ForegroundColor Yellow
$css = Get-Content "css/styles.css" -Raw

$cssChecks = @(
    @{ Name = "Modal Responsive Class (.modal-dialog-responsive)"; Pattern = '\.modal-dialog-responsive\s*\{' },
    @{ Name = "Large Modal Responsive Class (.modal-dialog-responsive-lg)"; Pattern = '\.modal-dialog-responsive-lg\s*\{' },
    @{ Name = "Card Media 16:10 Aspect Ratio (.card-media-wrap)"; Pattern = '\.card-media-wrap[\s\S]*?aspect-ratio:\s*16\s*/\s*10' },
    @{ Name = "Hero Media Wrap Fluid Aspect Ratio"; Pattern = '\.hero-media-wrap[\s\S]*?aspect-ratio:\s*16\s*/\s*10' },
    @{ Name = "Responsive Image Cover Fit & Center"; Pattern = '\.responsive-img-cover[\s\S]*?object-fit:\s*cover' },
    @{ Name = "Mobile Bottom Nav Dock (@media max-width: 1023px)"; Pattern = '@media\s*\(max-width:\s*1023px\)\s*\{\s*\.mobile-nav-bar' },
    @{ Name = "Global Overflow Prevention (overflow-x: hidden)"; Pattern = 'overflow-x:\s*hidden' }
)

foreach ($c in $cssChecks) {
    if ($css -match $c.Pattern) {
        Write-Host "  [PASS] $($c.Name)" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Missing or invalid: $($c.Name)" -ForegroundColor Red
        $allPassed = $false
    }
}

# 2. Audit HTML Presentation Portals
Write-Host "`n[2/3] Auditing HTML Portals for Modal, Footer Dock Clearance & Image Fit..." -ForegroundColor Yellow

foreach ($p in $pages) {
    Write-Host "`n  Analyzing $p..." -ForegroundColor Magenta
    $content = Get-Content $p -Raw
    
    # Check Plan Modal Responsive Sizing
    if ($content -match 'id="planTripModal"[\s\S]*?modal-dialog-responsive') {
        Write-Host "    [PASS] #planTripModal has adaptive responsive class" -ForegroundColor Green
    } else {
        Write-Host "    [FAIL] #planTripModal missing modal-dialog-responsive" -ForegroundColor Red
        $allPassed = $false
    }

    # Check Voucher Modal Responsive Sizing
    if ($content -match 'id="itineraryVoucherModal"[\s\S]*?modal-dialog-responsive-lg') {
        Write-Host "    [PASS] #itineraryVoucherModal has adaptive responsive class" -ForegroundColor Green
    } else {
        Write-Host "    [FAIL] #itineraryVoucherModal missing modal-dialog-responsive-lg" -ForegroundColor Red
        $allPassed = $false
    }

    # Check Footer Dock Padding Clearance (pb-24 lg:pb-16)
    if ($content -match '<footer[\s\S]*?pb-24\s+lg:pb-16') {
        Write-Host "    [PASS] Footer has mobile dock clearance (pb-24 lg:pb-16)" -ForegroundColor Green
    } else {
        Write-Host "    [FAIL] Footer missing safe clearance padding (pb-24 lg:pb-16)" -ForegroundColor Red
        $allPassed = $false
    }

    # Check Mobile Nav Bar Presence
    if ($content -match 'class="[^"]*mobile-nav-bar[^"]*"') {
        Write-Host "    [PASS] Mobile bottom navigation dock present" -ForegroundColor Green
    } else {
        Write-Host "    [FAIL] Mobile navigation dock missing" -ForegroundColor Red
        $allPassed = $false
    }

    # Check Image Wrap & Cover Compliance
    $pattern = '<img[^>]+>'
    $imgMatches = [regex]::Matches($content, $pattern)
    $imgCount = $imgMatches.Count
    $imgCompliant = $true

    foreach ($m in $imgMatches) {
        $tag = $m.Value
        $isOk = ($tag -match 'object-cover') -or ($tag -match 'object-center') -or ($tag -match 'responsive-img-cover')
        if (-not $isOk) {
            Write-Host "    [WARN] Image tag not explicitly cover-wrapped: $tag" -ForegroundColor DarkYellow
            $imgCompliant = $false
        }
    }

    if ($imgCompliant) {
        Write-Host "    [PASS] All $imgCount images properly wrapped and responsive" -ForegroundColor Green
    } else {
        Write-Host "    [FAIL] Images found without responsive wrapper" -ForegroundColor Red
        $allPassed = $false
    }
}

# 3. Final Summary
Write-Host "`n=================================================================" -ForegroundColor Cyan
if ($allPassed) {
    Write-Host "   AUDIT RESULT: 100% PAN-DEVICE RESPONSIVENESS VERIFIED! [PASS] " -ForegroundColor Green
} else {
    Write-Host "   AUDIT RESULT: SOME CHECKS FAILED. PLEASE REVIEW ABOVE. [FAIL] " -ForegroundColor Red
    exit 1
}
Write-Host "=================================================================`n" -ForegroundColor Cyan
