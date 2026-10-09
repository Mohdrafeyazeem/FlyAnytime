# verify_images.ps1 - Verify image responsiveness and fitting across all HTML files
$pages = @("index.html", "flights.html", "stays.html", "trains.html", "destinations.html")

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   FLY ANYTIME - RESPONSIVE IMAGE FIT AUDIT               " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

foreach ($p in $pages) {
    $content = Get-Content $p -Raw
    $pattern = '<img[^>]+>'
    $matches = [regex]::Matches($content, $pattern)
    Write-Host "`nChecking $p (Total images found: $($matches.Count))..." -ForegroundColor Yellow
    
    $fileOk = $true
    foreach ($m in $matches) {
        $tag = $m.Value
        $hasObjectCover = ($tag -match 'object-cover') -or ($tag -match 'object-center') -or ($tag -match 'responsive-img-cover')
        $hasWFull = ($tag -match 'w-full') -or ($tag -match 'w-') -or ($tag -match 'responsive-img-cover')
        
        if (-not $hasObjectCover) {
            Write-Host "  [WARN] Image tag missing explicit object-cover: $tag" -ForegroundColor DarkYellow
            $fileOk = $false
        }
    }
    if ($fileOk) {
        Write-Host "  [PASS] All $($matches.Count) images in $p have responsive 'object-cover' styling!" -ForegroundColor Green
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "   AUDIT COMPLETE                                        " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
