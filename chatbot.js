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
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        chatbotLog.appendChild(messageDiv);
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
                1. ShopEasy E-commerce - Full-stack online shopping platform
                2. WeatherNow - Real-time weather tracking app
                3. CarRental Hub - Vehicle booking system
                4. Social Analytics Pro - Social media dashboard
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

    // Send message
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;

        addMessageWithAnimation(message, true);
        messageInput.value = '';

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

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Initialize chatbot
    initChatbot();
});