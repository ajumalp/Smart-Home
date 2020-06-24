<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-June-2020
 */

namespace ES\SA;

use ES\Core\SQLConnection;

include_once __DIR__ . "/../dbExpress/SQLConnection.php";

$varPostData = trim($_GET['DATA']);
$varPostData = explode('|', $varPostData);

$sResult = "";
SQLConnection::FetchRowsEx("SELECT G.PINTYPE, G.INVERTED, G.VALUE FROM gadgets G LEFT JOIN devices D ON D.DEVICEID = G.DEVICEID WHERE D.UNIQUEID = '%s'", $varPostData[0], function ($varRow) use (&$sResult) {
    $sPinState = "ON";
    if ($varRow['VALUE'] === "NF" || $varRow['VALUE'] === "IT") {
        $sPinState = "OFF";
    }
    $sResult = $sResult . "_PINTYPE_" . trim($varRow['PINTYPE']) . "=" . $sPinState . "\n";
});

echo $sResult;