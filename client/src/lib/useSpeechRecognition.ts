import { useEffect, useState } from "react"

const useSpeechRecognition = (isActive: boolean) => {

    const [transcript, setTranscript] = useState<string>('');
    const [isListening, setIsListening] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {

        const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError('Speech Recognition is not supported in this browser.');
            return;
        };

        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.continuous = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            const lastresult = event.results[event.results.length - 1];
            if (lastresult || lastresult.isFinal) {
                {
                    setTranscript(lastresult[0].transcript);
                };
            };
        };

        recognition.onerror = (event: any) => {
            setError(event.error);
        };

        recognition.onstart = (event: any) => {
            setIsListening(true);
        };

        recognition.onend = (event: any) => {
            setIsListening(false);
        };

        if (isActive) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };

    }, [isActive]);
    return { transcript, isListening, error };

};

export default useSpeechRecognition;