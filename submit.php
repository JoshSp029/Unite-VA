<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false]);
    exit;
}

header('Content-Type: application/json');

$required = ['firstName', 'lastName', 'age', 'country', 'email', 'simulator', 'level'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(['success' => false]);
        exit;
    }
}

function clean($val) {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$firstName = clean($_POST['firstName']);
$lastName  = clean($_POST['lastName']);
$age       = (int) $_POST['age'];
$country   = clean($_POST['country']);
$email     = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$simulator = clean($_POST['simulator']);
$level     = clean($_POST['level']);
$hours     = isset($_POST['hours']) && $_POST['hours'] !== '' ? (int) $_POST['hours'] : 'Not provided';
$message   = isset($_POST['message']) && $_POST['message'] !== '' ? clean($_POST['message']) : 'No message provided';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false]);
    exit;
}

$to      = 'unitedvaivao@gmail.com';
$subject = 'New Pilot Application — United VA';

$body  = "New pilot application received from the United VA website.\n\n";
$body .= "Name:             {$firstName} {$lastName}\n";
$body .= "Age:              {$age}\n";
$body .= "Country:          {$country}\n";
$body .= "Email:            {$email}\n";
$body .= "Simulator:        {$simulator}\n";
$body .= "Experience Level: {$level}\n";
$body .= "Flight Hours:     {$hours}\n\n";
$body .= "Message:\n{$message}\n";

$headers  = "From: United VA Website <noreply@unitedva.pro>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

echo json_encode(['success' => $sent]);
