<?php
/**
 * Formulario de Contacto - NeuralFilms
 * Backend simple para enviar emails desde el formulario
 */

// Configuración CORS (si es necesario)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Leer datos JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validación básica
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos requeridos']);
    exit;
}

// Sanitizar datos
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$company = isset($data['company']) ? htmlspecialchars(strip_tags($data['company'])) : 'No especificada';
$projectType = isset($data['project']) ? htmlspecialchars(strip_tags($data['project'])) : 'No especificado';
$message = htmlspecialchars(strip_tags($data['message']));

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

// ====== CONFIGURACIÓN - EDITA ESTO ======
$to = "tu-email@ejemplo.com";  // TU EMAIL AQUÍ
$subject = "Nueva Consultoría - NeuralFilms";
// =========================================

// Crear email en HTML
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0D1B2A 0%, #7B2CBF 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f4f4f4; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #7B2CBF; }
        .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00FFF5; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎬 Nueva Consultoría - NeuralFilms</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Nombre:</div>
                <div class='value'>{$name}</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>{$email}</div>
            </div>
            <div class='field'>
                <div class='label'>Empresa:</div>
                <div class='value'>{$company}</div>
            </div>
            <div class='field'>
                <div class='label'>Tipo de Proyecto:</div>
                <div class='value'>{$projectType}</div>
            </div>
            <div class='field'>
                <div class='label'>Mensaje:</div>
                <div class='value'>{$message}</div>
            </div>
        </div>
        <div class='footer'>
            <p>Hecho por SantOps y ❤️ en Argentina</p>
        </div>
    </div>
</body>
</html>
";

// Headers del email
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    "From: NeuralFilms <noreply@neuralfilms.com>",
    "Reply-To: {$email}"
];

// Enviar email
$sent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

// Guardar en archivo de log (opcional)
$logEntry = date('[Y-m-d H:i:s]') . " - {$name} ({$email}) - {$projectType}\n";
file_put_contents('contact-log.txt', $logEntry, FILE_APPEND);

// Responder
if ($sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email enviado correctamente'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al enviar email',
        'message' => 'Por favor intenta nuevamente'
    ]);
}
?>
