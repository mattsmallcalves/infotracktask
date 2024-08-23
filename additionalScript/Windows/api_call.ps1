$uri = "http://localhost:5205/automation"
$body = @{
    Keyword = "land registry searches"
    URL = "infotrack.co.uk"
    SearchEngine = "Google"
}

$bodyJson = $body | ConvertTo-Json

Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" 
-Body $bodyJson

