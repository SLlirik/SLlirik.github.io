<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Тема письма";
$file = $_FILES['file'];

$c = true;
//Формирование письма
foreach ( $_POST as $key => $value ) {
    if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
        $body .= "
        " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
        </tr>
        ";
    }
}

$body = "<table style='width: 100%;'>$body</table>";

// Настройка PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth  = true;

    // Настройка почты
    $mail->Host     = 'smtp.mail.ru';
    $mail->Username    = 'ваша почта';  //Ваша почта
    $mail->Password    = 'пароль'; //Ваш пароль
    $mail->SMTPSecure    = 'ssl';
    $mail->Port    = 465;

    $mail->setFrom('Ваша почта', 'Заявка с Вашего сайта'); // Отправитель

    // Получатель письма
    $mail->addAddress(''); // Почта получателя
    // $mail->addAddress(''); // Еще один, если нужно

    // Прикрепление файлов к письму
    if(!empty($file['name'][0])) {
        for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
            $filename = $file['name'][$ct];
            if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплен";
            } else {

                $rfile[] = "Не удалось прикрепить файл $filename";
            }
        }
    }

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send();


} catch (Exception $e) {
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
