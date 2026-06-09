import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  generateCaptcha() {
    const captcha = svgCaptcha.create({
      size: 6,
      noise: 2,
      color: true,
      background: '#f0f0f0',
      width: 150,
      height: 50,
    });
    
    return {
      svg: captcha.data,
      text: captcha.text.toLowerCase(),
    };
  }
  
  validateCaptcha(userInput: string, storedText: string): boolean {
    return userInput.toLowerCase() === storedText.toLowerCase();
  }
}
