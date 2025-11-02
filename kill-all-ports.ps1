# PowerShell script to kill all processes using Activity ports
# Usage: Run this script whenever you need to free up all activity ports

Write-Host "Checking for processes using Activity ports..." -ForegroundColor Cyan

# Define all ports used by activities
$ports = @(3001, 3002, 3004, 3005, 3006, 3101, 3102, 3104, 3105, 3106)

$foundProcesses = $false

foreach ($port in $ports) {
    $connections = netstat -ano | Select-String ":$port\s" | Select-String "LISTENING"
    
    if ($connections) {
        $foundProcesses = $true
        foreach ($connection in $connections) {
            $parts = $connection -split '\s+' | Where-Object { $_ -ne '' }
            $pid = $parts[-1]
            
            try {
                $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
                if ($process) {
                    Write-Host "Killing process on port $port (PID: $pid, Name: $($process.ProcessName))" -ForegroundColor Yellow
                    Stop-Process -Id $pid -Force
                    Write-Host "  ✓ Successfully killed PID $pid" -ForegroundColor Green
                }
            }
            catch {
                Write-Host "  ✗ Failed to kill PID $pid" -ForegroundColor Red
            }
        }
    }
}

if (-not $foundProcesses) {
    Write-Host "✓ All ports are free! No processes to kill." -ForegroundColor Green
}
else {
    Write-Host "`n✓ All processes have been terminated." -ForegroundColor Green
}

Write-Host "`nPort Status:" -ForegroundColor Cyan
Write-Host "Activity 1: 3001 (backend), 3101 (frontend)" -ForegroundColor White
Write-Host "Activity 2: 3002 (backend), 3102 (frontend)" -ForegroundColor White
Write-Host "Activity 3: 3006 (backend), 3106 (frontend)" -ForegroundColor White
Write-Host "Activity 4: 3004 (backend), 3104 (frontend)" -ForegroundColor White
Write-Host "Activity 5: 3005 (backend), 3105 (frontend)" -ForegroundColor White
