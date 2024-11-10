import { useEffect, useState } from "react";

function TypingAnimation(messageText, typingSpeed) {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState(0);

  useEffect(() => {
    {/* VERIFICA SI "currentCharacter" ES MENOR A "messageText" */}
    if (currentCharacter < messageText.length) {
      const timeoutId = setTimeout(() => {
        {/* ACTUALIZA "displayedMessage" AÑADIENDO EL CARACTER CORRESPONDIENTE A LA POSICIÓN DE "currentCharacter" */}
        setDisplayedMessage((prevText) => prevText + messageText[currentCharacter]);
        {/* INCREMENTA "currentCharacter" EN UNO PARA ESCRIBIR EL SIGUIENTE CARACTER */}
        setCurrentCharacter((prev) => prev + 1);
      }, typingSpeed);
      {/* ASEGURARSE DE QUE "typingSpeed" HAYA TERMINADO PARA SEGUIR CON EL PRÓXIMO CARACTER DE "currentCharacter" */}
      return () => clearTimeout(timeoutId);
    }
  }, [currentCharacter, messageText, typingSpeed]);

  return displayedMessage;
}

export default TypingAnimation;