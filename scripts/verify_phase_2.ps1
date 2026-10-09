# Phase 2 Empirical Verification Script
Write-Host "=== FLY ANYTIME: PHASE 2 EMPIRICAL VERIFICATION ==="

$htmlFiles = @("index.html", "flights.html", "stays.html", "trains.html", "destinations.html")
$allPassed = $true

# Check 1: Check Modal and WhatsApp button across all HTML files
Write-Host "`n[Check 1] Verifying Modal and WhatsApp elements across 5 platform pages..."
foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $hasModal = $content.Contains('id="planTripModal"')
        $hasClose = $content.Contains('id="closePlanModal"')
        $hasWaBtn = $content.Contains('id="modalWhatsAppBtn"')
        $hasTitle = $content.Contains('id="modalPackageTitle"')
        $hasAlert = $content.Contains('id="modalSuccessAlert"')
        $hasForm = $content.Contains('id="planTripForm"')

        if ($hasModal -and $hasClose -and $hasWaBtn -and $hasTitle -and $hasAlert -and $hasForm) {
            Write-Host "  [PASS] $file : All modal components present" -ForegroundColor Green
        } else {
            Write-Host "  [FAIL] $file : Missing modal components! (modal=$hasModal, close=$hasClose, wa=$hasWaBtn, title=$hasTitle, alert=$hasAlert, form=$hasForm)" -ForegroundColor Red
            $allPassed = $false
        }
    } else {
        Write-Host "  [FAIL] $file does not exist!" -ForegroundColor Red
        $allPassed = $false
    }
}

# Check 2: Verifying Flight Calculator Controls in flights.html
Write-Host "`n[Check 2] Verifying Live Flight Calculator Controls in flights.html..."
$flightsHtml = Get-Content "flights.html" -Raw
$calculatorElements = @("charterOriginSelect", "charterDestSelect", "charterAircraftSelect", "quoteDuration", "quotePrice", "whatsappQuoteBtn")
foreach ($el in $calculatorElements) {
    if ($flightsHtml.Contains("id=`"$el`"")) {
        Write-Host "  [PASS] Element id='$el' present in flights.html" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Missing element id='$el' in flights.html" -ForegroundColor Red
        $allPassed = $false
    }
}

# Check 3: Verifying Calculation Logic and WhatsApp Link Generator in js/main.js
Write-Host "`n[Check 3] Verifying Calculation and WhatsApp Engines in js/main.js..."
$jsContent = Get-Content "js/main.js" -Raw
$jsFeatures = @("AIRPORT_DISTANCES", "AIRCRAFT_DATA", "calculateCharterQuote", "generateWhatsAppInquiryUrl", "updateLiveCharterQuote", "modalWhatsAppBtn")
foreach ($feat in $jsFeatures) {
    if ($jsContent.Contains($feat)) {
        Write-Host "  [PASS] Feature '$feat' implemented in js/main.js" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Missing feature '$feat' in js/main.js" -ForegroundColor Red
        $allPassed = $false
    }
}

# Check 4: Verifying Responsive Image Styling & Protection in css/styles.css and js/main.js
Write-Host "`n[Check 4] Verifying Fluid Responsive Image Containment..."
$cssContent = Get-Content "css/styles.css" -Raw
if ($cssContent.Contains(".card-media-wrap") -and $cssContent.Contains("object-fit: cover") -and $jsContent.Contains("data-fallback-attempted")) {
    Write-Host "  [PASS] Fluid aspect-ratio wrappers (.card-media-wrap) & image fallback protection present" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Responsive image protection missing!" -ForegroundColor Red
    $allPassed = $false
}

Write-Host "`n================================================"
if ($allPassed) {
    Write-Host "ALL CHECKS PASSED: Phase 2 verified successfully!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "ONE OR MORE CHECKS FAILED!" -ForegroundColor Red
    exit 1
}
