import { Link } from 'react-router-dom'
import { Github, Heart } from 'lucide-react'
import { APP_CONFIG } from '@/core/config/app.config'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-muted/50 no-print">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-sm mb-3">About Rights Shield</h3>
            <p className="text-sm text-muted-foreground">
              Privacy-first activist resource platform. Open source, no tracking, works offline.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-sm mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-foreground">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-foreground">
                  Settings
                </Link>
              </li>
              {APP_CONFIG.links.github && (
                <li>
                  <a
                    href={APP_CONFIG.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground inline-flex items-center gap-1"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-sm mb-3">Community</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Built with <Heart className="inline h-3 w-3" /> by activists, for activists.
            </p>
            <p className="text-sm text-muted-foreground">
              Licensed under AGPLv3
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Rights Shield. All rights reserved.
            <span className="ml-2">v{APP_CONFIG.version}</span>
          </p>
          <p className="mt-2 text-xs">
            This is educational information, not legal advice.
            For specific situations, consult with an attorney.
          </p>
        </div>
      </div>
    </footer>
  )
}
