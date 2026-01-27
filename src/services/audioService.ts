class AudioService {
  private static instance: AudioService;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  private constructor() {
    this.initVoice();
  }

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  private initVoice() {
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Prefer Google US English or any English voice
      this.selectedVoice = voices.find(v => v.name.includes('Google US English'))
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0];
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      setVoice();
    }
    window.speechSynthesis.onvoiceschanged = setVoice;
  }

  speak(text: string, rate: number = 0.9): void {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = rate;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  speakTeam(teamName: string): void {
    this.speak(teamName, 0.85);
  }

  speakPlayer(playerName: string): void {
    this.speak(playerName, 0.85);
  }

  speakCelebration(): void {
    const celebrations = [
      "Amazing, Luigi!",
      "You're on fire!",
      "Nothing but net!",
      "Slam dunk!",
      "You're a superstar!",
      "Great job, Luigi!",
      "MVP! MVP!",
      "Swish!",
    ];
    const random = celebrations[Math.floor(Math.random() * celebrations.length)];
    this.speak(random, 1);
  }

  speakCorrect(): void {
    const phrases = ["Correct!", "Yes!", "Nice!", "Great!", "Right!"];
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    this.speak(random, 1.1);
  }

  speakIncorrect(): void {
    const phrases = ["Try again!", "Not quite!", "Oops!", "Almost!"];
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    this.speak(random, 1);
  }

  speakWelcome(): void {
    this.speak("Welcome to Luigi's Basketball Trivia! Let's play!", 0.9);
  }
}

export const audioService = AudioService.getInstance();
