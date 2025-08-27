import { useState, useEffect, useRef } from 'react';
import './CyberpunkTerminal.css';

interface Command {
  command: string;
  output: string[];
  type: 'info' | 'success' | 'error' | 'warning';
  isAnimating?: boolean;
  currentLine?: number;
  currentChar?: number;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  position: string;
  skills: string[];
  achievements: string[];
}

interface ClubStats {
  totalMembers: number;
  activeContests: number;
  problemsSolved: number;
  achievements: number;
}

const CyberpunkTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sample data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "President",
      position: "Full Stack Developer",
      skills: ["React", "Node.js", "Python", "Algorithm Design"],
      achievements: ["ICPC Regional Winner", "Google Summer of Code", "Lead Developer at TechCorp"]
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Vice President", 
      position: "AI/ML Engineer",
      skills: ["Python", "TensorFlow", "PyTorch", "Data Structures"],
      achievements: ["Kaggle Expert", "Published Research", "Microsoft Intern"]
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Technical Lead",
      position: "Backend Developer", 
      skills: ["Java", "Spring Boot", "Docker", "Microservices"],
      achievements: ["AWS Certified", "Tech Lead at StartupXYZ", "Open Source Contributor"]
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Events Coordinator",
      position: "Frontend Developer",
      skills: ["React", "TypeScript", "Design Systems", "UI/UX"],
      achievements: ["Design Award Winner", "Frontend Lead", "Community Speaker"]
    },
    {
      id: 5,
      name: "David Kim", 
      role: "Treasurer",
      position: "Data Scientist",
      skills: ["Python", "R", "SQL", "Machine Learning"],
      achievements: ["Data Science Certification", "Research Publication", "Analytics Expert"]
    },
    {
      id: 6,
      name: "Lisa Wang",
      role: "Secretary",
      position: "Mobile Developer",
      skills: ["Flutter", "React Native", "Swift", "Kotlin"],
      achievements: ["App Store Featured", "Mobile Expert", "Tech Blogger"]
    },
    {
      id: 7,
      name: "John Smith",
      role: "Senior Member",
      position: "Software Engineer",
      skills: ["JavaScript", "Node.js", "MongoDB"],
      achievements: ["Contest Winner", "Open Source Contributor"]
    },
    {
      id: 8,
      name: "Anna Brown",
      role: "Active Member", 
      position: "Backend Developer",
      skills: ["Python", "Django", "PostgreSQL"],
      achievements: ["Hackathon Winner", "Tech Speaker"]
    }
  ];

  const clubStats: ClubStats = {
    totalMembers: 150,
    activeContests: 12,
    problemsSolved: 2500,
    achievements: 45
  };

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => [
        'Available commands:',
        '─────────────────────',
        'help               - Show this help message',
        'clear              - Clear terminal',
        'stats              - Show club statistics',
        'team               - List all team members',
        'team <name>        - Get details of specific member',
        'events             - Show upcoming events',
        'skills             - List all skills in the club',
        'achievements       - Show club achievements',
        'contact            - Show contact information',
        'about              - About C Square',
        'whoami             - Display current user info',
        'date               - Show current date and time',
        'exit               - Close terminal'
      ]
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        setHistory([]);
        return [];
      }
    },
    stats: {
      description: 'Show club statistics',
      execute: () => [
        '📊 C SQUARE STATISTICS',
        '════════════════════════',
        `👥 Total Members:     ${clubStats.totalMembers}+`,
        `🏆 Active Contests:   ${clubStats.activeContests}`,
        `💻 Problems Solved:   ${clubStats.problemsSolved}+`,
        `🎯 Achievements:      ${clubStats.achievements}+`,
        '',
        '📈 Growth: +25% this semester'
      ]
    },
    team: {
      description: 'List team members or get specific member details',
      execute: (args?: string) => {
        if (!args) {
          return [
            '👥 CORE TEAM MEMBERS',
            '══════════════════════',
            ...teamMembers.map(member => 
              `${member.id}. ${member.name} - ${member.role} (${member.position})`
            ),
            '',
            'Use "team <name>" for detailed info'
          ];
        }
        
        const member = teamMembers.find(m => 
          m.name.toLowerCase().includes(args.toLowerCase())
        );
        
        if (member) {
          return [
            `👤 ${member.name.toUpperCase()}`,
            '═'.repeat(member.name.length + 2),
            `Role: ${member.role}`,
            `Position: ${member.position}`,
            `Skills: ${member.skills.join(', ')}`,
            'Achievements:',
            ...member.achievements.map(achievement => `  • ${achievement}`)
          ];
        }
        
        return [`❌ Member "${args}" not found. Use "team" to list all members.`];
      }
    },
    events: {
      description: 'Show upcoming events',
      execute: () => [
        '📅 UPCOMING EVENTS',
        '═══════════════════',
        '🎯 Algorithm Workshop - Aug 30, 2025',
        '🏆 Coding Competition - Sep 5, 2025',
        '💡 Tech Talk Series - Sep 12, 2025',
        '🚀 Hackathon 2025 - Sep 20-22, 2025',
        '',
        'Register at: events@csquare.com'
      ]
    },
    skills: {
      description: 'List all skills in the club',
      execute: () => {
        const allSkills = Array.from(new Set(
          teamMembers.flatMap(member => member.skills)
        )).sort();
        
        return [
          '💻 CLUB SKILLS INVENTORY',
          '═══════════════════════════',
          ...allSkills.map(skill => `• ${skill}`),
          '',
          `Total unique skills: ${allSkills.length}`
        ];
      }
    },
    achievements: {
      description: 'Show club achievements',
      execute: () => [
        '🏆 CLUB ACHIEVEMENTS',
        '═══════════════════════',
        '🥇 ICPC Regional Winners',
        '🏅 Google Summer of Code Participants',
        '🎖️ Microsoft Certified Members',
        '📱 App Store Featured Applications',
        '📊 Kaggle Competition Experts',
        '🌟 Open Source Contributors',
        '🎤 Conference Speakers',
        '💼 Industry Leaders'
      ]
    },
    contact: {
      description: 'Show contact information',
      execute: () => [
        '📞 CONTACT INFORMATION',
        '═══════════════════════',
        'Email: contact@csquare.com',
        'Website: https://csquare.dev',
        'Discord: discord.gg/csquare',
        'GitHub: github.com/csquare-club',
        'LinkedIn: linkedin.com/company/csquare',
        '',
        'Office: Room 301, CS Building',
        'Hours: Mon-Fri 9AM-5PM'
      ]
    },
    about: {
      description: 'About C Square',
      execute: () => [
        '🚀 ABOUT C SQUARE',
        '═══════════════════',
        'C Square is a competitive programming club dedicated to',
        'fostering innovation and excellence in computer science.',
        '',
        'Founded: 2020',
        'Mission: Empowering students through competitive programming',
        'Vision: Creating the next generation of tech leaders',
        '',
        'Join us in our journey to excellence! 💫'
      ]
    },
    whoami: {
      description: 'Display current user info',
      execute: () => [
        '👤 USER INFO',
        '═══════════════',
        'User: guest@csquare.dev',
        'Role: Visitor',
        'Access Level: Public',
        'Session: Active',
        `Connected: ${new Date().toLocaleString()}`
      ]
    },
    date: {
      description: 'Show current date and time',
      execute: () => [
        `📅 ${new Date().toLocaleDateString()}`,
        `🕐 ${new Date().toLocaleTimeString()}`
      ]
    },
    exit: {
      description: 'Close terminal',
      execute: () => {
        setIsOpen(false);
        return ['👋 Terminal session ended. Goodbye!'];
      }
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Typing animation function with variable speed based on command type
  const animateTyping = (command: Command, commandIndex: number) => {
    // Different typing speeds for different command types
    let typingSpeed = 25; // default speed
    
    if (command.type === 'error') {
      typingSpeed = 15; // faster for errors
    } else if (command.command === 'help') {
      typingSpeed = 20; // medium speed for help
    } else if (command.command === 'stats' || command.command.startsWith('team')) {
      typingSpeed = 30; // slower for detailed info
    }

    let currentLine = 0;
    let currentChar = 0;

    const typeNextChar = () => {
      if (currentLine >= command.output.length) {
        // Animation complete - add a dramatic pause
        setTimeout(() => {
          setHistory(prev => prev.map((cmd, idx) => 
            idx === commandIndex 
              ? { ...cmd, isAnimating: false, currentLine: undefined, currentChar: undefined }
              : cmd
          ));
          setIsTyping(false);
        }, 200);
        return;
      }

      const currentLineText = command.output[currentLine];
      
      if (currentChar >= currentLineText.length) {
        // Move to next line
        currentLine++;
        currentChar = 0;
        // Pause between lines for dramatic effect
        typingTimeoutRef.current = setTimeout(typeNextChar, typingSpeed * 3);
      } else {
        // Update the command with current progress
        setHistory(prev => prev.map((cmd, idx) => 
          idx === commandIndex 
            ? { ...cmd, currentLine, currentChar: currentChar + 1 }
            : cmd
        ));
        currentChar++;
        
        // Variable speed - slower for special characters, faster for spaces
        let charSpeed = typingSpeed;
        const char = currentLineText[currentChar - 1];
        
        if (char === ' ') {
          charSpeed = typingSpeed * 0.5; // faster for spaces
        } else if ('═─│┌┐└┘╔╗╚╝'.includes(char)) {
          charSpeed = typingSpeed * 0.3; // very fast for box drawing characters
        } else if ('🚀👥📊🏆💻🎯📅💡'.includes(char)) {
          charSpeed = typingSpeed * 2; // slower for emojis
        }
        
        typingTimeoutRef.current = setTimeout(typeNextChar, charSpeed);
      }
    };

    typeNextChar();
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Don't allow new commands while typing
    if (isTyping) return;

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');
    const argsString = args.join(' ');

    if (commands[command as keyof typeof commands]) {
      const result = commands[command as keyof typeof commands].execute(argsString);
      
      if (command === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      const newCommand: Command = {
        command: trimmedCmd,
        output: result,
        type: result.some(line => line.includes('❌')) ? 'error' : 'success',
        isAnimating: true,
        currentLine: 0,
        currentChar: 0
      };

      setHistory(prev => {
        const newHistory = [...prev, newCommand];
        const commandIndex = newHistory.length - 1;
        
        // Start typing animation
        setIsTyping(true);
        setTimeout(() => animateTyping(newCommand, commandIndex), 100);
        
        return newHistory;
      });
    } else {
      const errorCommand: Command = {
        command: trimmedCmd,
        output: [`❌ Command '${command}' not found. Type 'help' for available commands.`],
        type: 'error',
        isAnimating: true,
        currentLine: 0,
        currentChar: 0
      };
      
      setHistory(prev => {
        const newHistory = [...prev, errorCommand];
        const commandIndex = newHistory.length - 1;
        
        setIsTyping(true);
        setTimeout(() => animateTyping(errorCommand, commandIndex), 100);
        
        return newHistory;
      });
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Disable input while typing animation is active
    if (isTyping) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const toggleTerminal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Welcome message when opening with typing animation
      const welcomeCommand: Command = {
        command: 'init',
        output: [
          '🚀 C SQUARE TERMINAL v2.0.1',
          '════════════════════════════════',
          'Welcome to the C Square Interactive Terminal!',
          'Type "help" to see available commands.',
          '─────────────────────────────────────────────',
        ],
        type: 'info',
        isAnimating: true,
        currentLine: 0,
        currentChar: 0
      };
      
      setHistory([welcomeCommand]);
      setIsTyping(true);
      
      // Start welcome message typing animation
      setTimeout(() => animateTyping(welcomeCommand, 0), 500);
    } else {
      // Clear typing timeout when closing
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Terminal Toggle Button */}
      <button 
        className="terminal-toggle-btn"
        onClick={toggleTerminal}
        title="Open Terminal"
      >
        <span className="terminal-icon">$</span>
      </button>

      {/* Terminal Window */}
      {isOpen && (
        <div ref={terminalRef} className="cyberpunk-terminal">
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="control-btn close" onClick={() => setIsOpen(false)}></span>
              <span className="control-btn minimize"></span>
              <span className="control-btn maximize"></span>
            </div>
            <div className="terminal-title">C Square Terminal</div>
          </div>
          
          <div className="terminal-body">
            <div ref={outputRef} className="terminal-output">
              {history.map((cmd, index) => (
                <div key={index} className="command-block">
                  <div className="command-input">
                    <span className="prompt">guest@csquare:~$</span>
                    <span className="command">{cmd.command}</span>
                  </div>
                  <div className={`command-output ${cmd.type}`}>
                    {cmd.output.map((line, lineIndex) => {
                      // Show typing animation
                      if (cmd.isAnimating) {
                        if (lineIndex < (cmd.currentLine || 0)) {
                          // Show complete previous lines
                          return (
                            <div key={lineIndex} className="output-line">
                              {line}
                            </div>
                          );
                        } else if (lineIndex === (cmd.currentLine || 0)) {
                          // Show current line being typed
                          const visibleText = line.substring(0, cmd.currentChar || 0);
                          return (
                            <div key={lineIndex} className="output-line typing">
                              {visibleText}
                              <span className="typing-cursor">█</span>
                            </div>
                          );
                        } else {
                          // Don't show future lines yet
                          return null;
                        }
                      } else {
                        // Show complete output when not animating
                        return (
                          <div key={lineIndex} className="output-line">
                            {line}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="terminal-input-container">
              <span className="prompt">guest@csquare:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => !isTyping && setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`terminal-input ${isTyping ? 'typing-disabled' : ''}`}
                placeholder={isTyping ? "Processing..." : "Type a command..."}
                autoComplete="off"
                spellCheck="false"
                disabled={isTyping}
              />
              {isTyping && <span className="typing-indicator">⚡ Processing...</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CyberpunkTerminal;