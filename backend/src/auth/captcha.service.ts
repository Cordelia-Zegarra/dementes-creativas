import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  private captchaStore = new Map<string, { text: string, timestamp: number }>();
  
  generateCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 1,
      color: true,
      background: '#f0f0f0',
      width: 120,
      height: 40,
      fontSize: 36,
      charPreset: '0123456789',
    });
    
    const id = Math.random().toString(36).substring(2, 15);
    
    this.captchaStore.set(id, {
      text: captcha.text,
      timestamp: Date.now()
    });
    
    setTimeout(() => this.captchaStore.delete(id), 5 * 60 * 1000);
    
    return {
      id,
      svg: captcha.data
    };
  }
  
  validateCaptcha(id: string, userInput: string): boolean {
    const captcha = this.captchaStore.get(id);
    if (!captcha) {
      return false;
    }
    
    if (Date.now() - captcha.timestamp > 5 * 60 * 1000) {
      this.captchaStore.delete(id);
      return false;
    }
    
    const isValid = userInput.toLowerCase() === captcha.text.toLowerCase();
    if (isValid) {
      this.captchaStore.delete(id);
    }
    return isValid;
  }
}
