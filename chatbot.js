/* filepath: /D:/Projects (html , css , js)/Portfolio/chatbot.js */
document.addEventListener('DOMContentLoaded', () => {
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatToggle = document.getElementById('chat-toggle');
    const closeChat = document.getElementById('close-chat');
    const minimizeChat = document.getElementById('minimize-chat');
    const chatbotLog = document.getElementById('chatbot-log');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send');
    const suggestionsWrapper = document.querySelector('.suggestion-wrapper');

    const userSettings = {
        initials: 'U',
        accentColor: '#FF1744'
    };

    const colorOptions = [
        '#FF1744', // Default Red
        '#2196F3', // Blue
        '#4CAF50', // Green
        '#9C27B0', // Purple
        '#FF9800'  // Orange
    ];

    // Enhanced suggestions with more options
    const suggestions = [
        { text: "👋 Tell me about yourself", category: "intro" },
        { text: "🎯 Show your best projects", category: "projects" },
        { text: "💻 Tech stack?", category: "tech" },
        { text: "🎓 Education?", category: "education" },
        { text: "📱 Contact info?", category: "contact" },
        { text: "💼 Available for hire?", category: "work" },
        { text: "🌟 Recent achievements", category: "achievements" },
        { text: "🛠️ Coding skills", category: "skills" },
        { text: "📊 Work experience", category: "experience" },
        { text: "🎨 UI/UX expertise", category: "design" },
        { text: "🚀 Latest projects", category: "projects" },
        { text: "📈 Development process", category: "process" },
        { text: "🔧 Tools used", category: "tools" },
        { text: "🌐 Website features", category: "features" },
        { text: "📱 Mobile apps", category: "mobile" }
    ];

    // Knowledge base for more intelligent responses
    const knowledgeBase = {
        greetings: ["hi", "hello", "hey", "greetings"],
        skills: ["skills", "technologies", "tech stack", "programming"],
        projects: ["projects", "portfolio", "work"],
        contact: ["contact", "email", "phone", "reach"],
        education: ["education", "degree", "university", "study"]
    };

    // Initialize chatbot
    function initChatbot() {
        createSuggestionButtons();
        addMessage("👋 Hi! I'm your AI assistant. How can I help you today?", false);
        showSuggestions();
    }

    // Toggle chatbot visibility
    chatToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('chatbot-hidden');
    });

    closeChat.addEventListener('click', () => {
        chatbotContainer.classList.add('chatbot-hidden');
    });

    minimizeChat.addEventListener('click', () => {
        chatbotContainer.classList.add('chatbot-hidden');
        setTimeout(() => chatToggle.click(), 300);
    });

    // Create suggestion buttons
    function createSuggestionButtons() {
        suggestionsWrapper.innerHTML = '';
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = suggestion.text;
            button.addEventListener('click', () => {
                messageInput.value = suggestion.text;
                sendMessage();
            });
            suggestionsWrapper.appendChild(button);
        });
    }

    // Add message to chat
    function createMessageElement(message, isUser) {
        const wrapper = document.createElement('div');
        wrapper.className = 'message-wrapper';

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;

        // Add reactions toolbar
        const reactionToolbar = document.createElement('div');
        reactionToolbar.className = 'reaction-toolbar';
        reactionToolbar.innerHTML = `
            <button class="reaction-btn" data-emoji="👍">👍</button>
            <button class="reaction-btn" data-emoji="❤️">❤️</button>
            <button class="reaction-btn" data-emoji="😊">😊</button>
        `;

        // Add timestamp
        const timestamp = document.createElement('div');
        timestamp.className = 'timestamp';
        timestamp.textContent = new Date().toLocaleTimeString();

        wrapper.appendChild(messageDiv);
        wrapper.appendChild(reactionToolbar);
        wrapper.appendChild(timestamp);

        // Setup reaction handlers
        reactionToolbar.querySelectorAll('.reaction-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                handleReaction(btn, messageDiv);
            };
        });

        return wrapper;
    }

    function handleReaction(button, messageDiv) {
        const emoji = button.dataset.emoji;
        const existingReaction = messageDiv.querySelector(`.reaction[data-emoji="${emoji}"]`);
        
        if (existingReaction) {
            existingReaction.remove();
        } else {
            const reaction = document.createElement('span');
            reaction.className = 'reaction';
            reaction.dataset.emoji = emoji;
            reaction.textContent = emoji;
            messageDiv.appendChild(reaction);
        }
    }

    function addMessage(message, isUser) {
        const messageElement = createMessageElement(message, isUser);
        chatbotLog.appendChild(messageElement);
        chatbotLog.scrollTop = chatbotLog.scrollHeight;
    }

    // Add smooth scroll effect for suggestions
    const suggestionWrapper = document.querySelector('.suggestion-wrapper');
    let isScrolling = false;

    suggestionWrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                suggestionWrapper.scrollLeft += e.deltaY;
                isScrolling = false;
            });
        }
    });

    // Show typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            indicator.appendChild(dot);
        }
        chatbotLog.appendChild(indicator);
        chatbotLog.scrollTop = chatbotLog.scrollHeight;
        return indicator;
    }

    // Generate intelligent response
    async function generateResponse(message) {
        const msg = message.toLowerCase();
        let response = '';

        if (msg.includes('yourself') || msg.includes('who are you')) {
            return "Hi! I'm Fahim's AI assistant. I'm here to help you learn more about his work, skills, and experience. What would you like to know?";
        }

        if (msg.includes('technologies') || msg.includes('tech stack') || msg.includes('skills')) {
            return `Here are Fahim's key technical skills:
                • Frontend: React.js, Vue.js, Angular
                • Backend: Node.js, Python, Express
                • Database: MongoDB, PostgreSQL
                • DevOps: Docker, AWS, CI/CD
                Would you like more details about any specific technology?`;
        }

        if (msg.includes('project') || msg.includes('work')) {
            return `Here are some notable projects:
                1. MindEase - Creative toolkit for mental wellness
                2. EventNova - Event management platform
                3. HealthCare Hub - Healthcare management system
                Which project would you like to know more about?`;
        }

        if (msg.includes('contact') || msg.includes('hire') || msg.includes('email')) {
            return `You can reach Fahim through:
                📧 Email: moonhunzai83@gmail.com
                📱 Phone: +92 326 2424598
                Or use the contact form on this page!`;
        }

        if (msg.includes('education') || msg.includes('study')) {
            return `Fahim's educational background:
                🎓 BS Computer Science at SZABIST University (2022-2026)
                📚 Full Stack Development Certification
                Want to know more about his academic achievements?`;
        }

        // Add more contextual responses
        if (msg.includes('experience') || msg.includes('work')) {
            return `Fahim has 5+ years of experience in:
                • Web Development
                • Mobile App Development
                • UI/UX Design
                • Cloud Solutions
                Would you like specific details about any area?`;
        }

        return "I'm not sure about that. Would you like to know about Fahim's projects, skills, or how to contact him?";
    }

    // Add animation for new messages
    function addMessageWithAnimation(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        chatbotLog.appendChild(messageDiv);

        // Trigger animation
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });

        if (isUser) {
            messageDiv.textContent = message;
        } else {
            typeResponse(message, messageDiv);
        }

        chatbotLog.scrollTop = chatbotLog.scrollHeight;
    }

    // Enhanced response generation with typing effect
    async function typeResponse(message, element) {
        const words = message.split(' ');
        for (let i = 0; i < words.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            element.textContent += words[i] + ' ';
        }
    }

    // Handle new messages
    function handleNewMessages() {
        const log = document.getElementById('chatbot-log');
        const isScrolledToBottom = log.scrollHeight - log.clientHeight <= log.scrollTop + 1;
        
        if (!isScrolledToBottom) {
            const badge = document.createElement('div');
            badge.className = 'new-messages';
            badge.innerHTML = '↓ New messages';
            badge.onclick = () => {
                log.scrollTop = log.scrollHeight;
                badge.style.opacity = '0';
                setTimeout(() => badge.remove(), 300);
            };
            document.getElementById('chatbot-container').appendChild(badge);
            badge.style.opacity = '1';
        }
    }

    // Enhance send button animation
    function animateSend(button) {
        button.innerHTML = '<i class="bi bi-check2"></i>';
        button.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            button.innerHTML = '<i class="bi bi-send-fill"></i>';
            button.style.transform = '';
        }, 1000);
    }

    // Send message
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;

        addMessageWithAnimation(message, true);
        messageInput.value = '';

        animateSend(sendButton);
        handleNewMessages();

        const typingIndicator = showTypingIndicator();
        
        // Simulate processing time
        setTimeout(async () => {
            typingIndicator.remove();
            const response = await generateResponse(message);
            addMessageWithAnimation(response, false);
            showSuggestions();
        }, 1000);
    }

    // Add horizontal scroll with mouse wheel
    const handleWheelScroll = (e) => {
        e.preventDefault();
        const container = e.currentTarget;
        const scrollAmount = e.deltaY;
        const scrollStep = 50;
        
        container.scrollLeft += scrollAmount > 0 ? scrollStep : -scrollStep;
    };

    // Enhanced suggestion display with smooth scroll
    function showSuggestions() {
        suggestionsWrapper.innerHTML = '';
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = suggestion.text;
            
            button.addEventListener('click', () => {
                messageInput.value = suggestion.text;
                sendMessage();
                
                // Scroll to view more suggestions
                button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
            
            suggestionsWrapper.appendChild(button);
        });

        // Add wheel scroll event
        suggestionsWrapper.addEventListener('wheel', handleWheelScroll, { passive: false });
    }

    // Add hover effect to messages
    document.addEventListener('DOMContentLoaded', () => {
        const sendSound = new Audio('data:audio/mp3;base64,...'); // Add base64 encoded sound
        const receiveSound = new Audio('data:audio/mp3;base64,...'); // Add base64 encoded sound
        
        sendButton.addEventListener('click', () => {
            if (!document.querySelector('.muted')) {
                sendSound.play();
            }
        });
    });

    // Add chat menu to header
    function setupChatMenu() {
        const header = document.querySelector('#chatbot-header');
        const menuContainer = document.createElement('div');
        menuContainer.className = 'chat-menu';
        menuContainer.innerHTML = `
            <button class="menu-btn" onclick="exportChat()">
                <i class="bi bi-download"></i>
            </button>
        `;
        header.appendChild(menuContainer);
    }

    function exportChat() {
        const messages = Array.from(document.querySelectorAll('.chat-message'))
            .map(msg => msg.textContent)
            .join('\n');
        
        const blob = new Blob([messages], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat-history.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Setup emoji picker
    function setupEmojiPicker() {
        const input = document.querySelector('#chatbot-input');
        const pickerBtn = document.createElement('button');
        pickerBtn.innerHTML = '<i class="bi bi-emoji-smile"></i>';
        pickerBtn.className = 'emoji-picker-btn';
        
        const picker = document.createElement('div');
        picker.className = 'emoji-picker';
        const emojis = ['😊', '👍', '❤️', '🎉', '🤔', '👏'];
        picker.innerHTML = emojis.map(emoji => 
            `<button class="emoji-btn">${emoji}</button>`
        ).join('');
        
        input.insertBefore(pickerBtn, input.firstChild);
        input.appendChild(picker);
        
        pickerBtn.onclick = () => picker.classList.toggle('active');
        
        picker.querySelectorAll('.emoji-btn').forEach(btn => {
            btn.onclick = () => {
                const messageInput = document.querySelector('#message');
                messageInput.value += btn.textContent;
                picker.classList.remove('active');
            };
        });
    }

    // Add menu functionality and export options
    function setupHeaderMenu() {
        const controls = document.querySelector('#chatbot-header .controls');
        
        const menu = document.createElement('div');
        menu.className = 'header-menu';
        menu.innerHTML = `
            <button class="menu-trigger">
                <i class="bi bi-three-dots-vertical"></i>
            </button>
            <div class="menu-dropdown">
                <div class="menu-item" onclick="exportChat('pdf')">
                    <i class="bi bi-file-pdf"></i>Export as PDF
                </div>
                <div class="menu-item" onclick="exportChat('text')">
                    <i class="bi bi-file-text"></i>Export as Text
                </div>
                <div class="menu-item" onclick="copyToClipboard()">
                    <i class="bi bi-clipboard"></i>Copy to Clipboard
                </div>
            </div>
        `;

        controls.insertBefore(menu, controls.firstChild);

        const trigger = menu.querySelector('.menu-trigger');
        const dropdown = menu.querySelector('.menu-dropdown');

        trigger.onclick = (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        };

        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
        });
    }

    function exportChat(type) {
        const messages = Array.from(document.querySelectorAll('.chat-message'))
            .map(msg => {
                const time = msg.querySelector('.timestamp')?.textContent || '';
                return `${time} ${msg.textContent}`;
            })
            .join('\n');

        if (type === 'text') {
            const blob = new Blob([messages], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chat-history.txt';
            a.click();
            URL.revokeObjectURL(url);
        } else if (type === 'pdf') {
            // Using window.print() as a simple PDF solution
            // Could be replaced with a proper PDF library
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <body style="font-family: Arial, sans-serif">
                        <pre>${messages}</pre>
                    </body>
                </html>
            `);
            printWindow.print();
            printWindow.close();
        }
    }

    function copyToClipboard() {
        const messages = Array.from(document.querySelectorAll('.chat-message'))
            .map(msg => msg.textContent)
            .join('\n');
        
        navigator.clipboard.writeText(messages).then(() => {
            // Show success feedback
            const dropdown = document.querySelector('.menu-dropdown');
            const feedback = document.createElement('div');
            feedback.textContent = 'Copied!';
            feedback.style.cssText = `
                position: absolute;
                bottom: -30px;
                right: 0;
                background: #1a1a1a;
                padding: 4px 8px;
                border-radius: 4px;
                color: #E0E0E0;
            `;
            dropdown.appendChild(feedback);
            setTimeout(() => feedback.remove(), 2000);
        });
    }

    // Initialize chatbot
    initChatbot();
    setupChatMenu();
    setupEmojiPicker();
    setupSettings();
    setupHeaderMenu();
    
    // Set initial accent color
    setAccentColor(userSettings.accentColor);
    
    // Get user initials (can be extended to use actual user data)
    const userInitials = prompt('Enter your initials (max 2 characters):') || 'U';
    userSettings.initials = userInitials.substring(0, 2).toUpperCase();
});