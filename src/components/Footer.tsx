import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export default function Footer() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/CWhite.png' : '/CBlack.png';

  return (
    <footer>
      <div>
        <div>
          <div>
            <img src={logoSrc} alt="C Square" />
            <span>C Square</span>
          </div>

          <div>
            <a href="#">
              <Github />
            </a>
            <a href="#">
              <Linkedin />
            </a>
            <a href="#">
              <Twitter />
            </a>
            <a href="#">
              <Mail />
            </a>
          </div>

          <p>
            © 2024 C Square. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
