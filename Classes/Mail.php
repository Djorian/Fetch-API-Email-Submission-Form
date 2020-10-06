<?php

class Mail
{
    private $headers;
    private $from = "example@example.loc";

	public function send ($sender, $subject, $message){

		// Основные заголоки
		$this->headers  = "MIME-Version: 1.0\r\n";
        $this->headers .= "Content-type: text/plain; charset=utf-8\r\n";

		// Дополнительные заголовки
        $this->headers .= "From: $sender\r\n";
        $this->headers .= "Reply-To: example@example.loc\r\n";
        $this->headers .= "Cc: someone-else@example.loc\r\n";
        $this->headers .= "Bcc: someone@example.loc\r\n";

        if (mail($this->from, $subject, $message, $this->headers)) {
            return 1;
        } else {
            return 0;
        }
	}
}

?>