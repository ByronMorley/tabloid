<?php

require_once '../ext/autoload.php';
use Dompdf\Dompdf;

$dompdf = new Dompdf();

$contents = file_get_contents('download.php');
$contents = mb_convert_encoding($contents, 'HTML-ENTITIES', 'UTF-8');
$dompdf->loadHtml($contents);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();
$dompdf->stream("printable", array("Attachment" => 0));

function getDataURI($image, $mime = '') {
	return 'data: '.(function_exists('mime_content_type') ? mime_content_type($image) : $mime).';base64,'.base64_encode(file_get_contents($image));
}