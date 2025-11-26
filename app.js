// Emotion data structure based on the feelings wheel
const emotionData = {
    Happy: {
        color: '#F9E79F',
        secondary: {
            Playful: {
                color: '#F9E79F',
                tertiary: ['Aroused', 'Cheeky' ]
            },
            Content: {
                color: '#F9E79F',
                tertiary: ['Free', 'Joyful']
            },
            Interested: {
                color: '#F9E79F',
                tertiary: ['Curious', 'Inquisitive']
            },
            Proud: {
                color: '#F9E79F',
                tertiary: ['Successful', 'Confident']
            },
            Accepted: {
                color: '#F9E79F',
                tertiary: ['Respected', 'Valued']
            },
            Powerful: {
                color: '#F9E79F',
                tertiary: ['Courageous', 'Creative']
            },
            Peaceful: {
                color: '#F9E79F',
                tertiary: ['Loving', 'Thankful']
            },
            Trusting: {
                color: '#F9E79F',
                tertiary: ['Sensitive', 'Intimate']
            },
            Optimistic: {
                color: '#F9E79F',
                tertiary: ['Hopeful', 'Inspired']
            }
        }
    },
    Sad: {
        color: '#85C1E2',
        secondary: {
            Lonely: {
                color: '#85C1E2',
                tertiary: ['Isolated', 'Abandoned']
            },
            Vulnerable: {
                color: '#85C1E2',
                tertiary: ['Victimized', 'Fragile']
            },
            Despair: {
                color: '#85C1E2',
                tertiary: ['Grief', 'Powerless']
            },
            Guilty: {
                color: '#85C1E2',
                tertiary: ['Ashamed', 'Remorseful']
            },
            Depressed: {
                color: '#85C1E2',
                tertiary: ['Empty', 'Inferior']
            },
            Hurt: {
                color: '#85C1E2',
                tertiary: ['Disappointed', 'Embarrassed']
            }
        }
    },
    Disgusted: {
        color: '#B4A6AB',
        secondary: {
            Disapproving: {
                color: '#B4A6AB',
                tertiary: ['Judgmental', 'Embarrassed']
            },
            Disappointed: {
                color: '#B4A6AB',
                tertiary: ['Appalled', 'Revolted']
            },
            Awful: {
                color: '#B4A6AB',
                tertiary: ['Nauseated', 'Detestable']
            },
            Repelled: {
                color: '#B4A6AB',
                tertiary: ['Horrified', 'Hesitant']
            }
        }
    },
    Angry: {
        color: '#F1948A',
        secondary: {
            'Let Down': {
                color: '#F1948A',
                tertiary: ['Humiliated', 'Bitter']
            },
            Humiliated: {
                color: '#F1948A',
                tertiary: ['Disrespected', 'Ridiculed']
            },
            Bitter: {
                color: '#F1948A',
                tertiary: ['Indignant', 'Violated']
            },
            Mad: {
                color: '#F1948A',
                tertiary: ['Furious', 'Jealous']
            },
            Aggressive: {
                color: '#F1948A',
                tertiary: ['Provoked', 'Hostile']
            },
            Frustrated: {
                color: '#F1948A',
                tertiary: ['Infuriated', 'Annoyed']
            },
            Distant: {
                color: '#F1948A',
                tertiary: ['Withdrawn', 'Numb']
            },
            Critical: {
                color: '#F1948A',
                tertiary: ['Skeptical', 'Dismissive']
            }
        }
    },
    Fearful: {
        color: '#F5CBA7',
        secondary: {
            Scared: {
                color: '#F5CBA7',
                tertiary: ['Helpless', 'Frightened']
            },
            Anxious: {
                color: '#F5CBA7',
                tertiary: ['Overwhelmed', 'Worried']
            },
            Insecure: {
                color: '#F5CBA7',
                tertiary: ['Inadequate', 'Inferior']
            },
            Weak: {
                color: '#F5CBA7',
                tertiary: ['Worthless', 'Insignificant']
            },
            Rejected: {
                color: '#F5CBA7',
                tertiary: ['Excluded', 'Persecuted']
            },
            Threatened: {
                color: '#F5CBA7',
                tertiary: ['Nervous', 'Exposed']
            }
        }
    },
    Bad: {
        color: '#D7BDE2',
        secondary: {
            Bored: {
                color: '#D7BDE2',
                tertiary: ['Indifferent', 'Apathetic']
            },
            Busy: {
                color: '#D7BDE2',
                tertiary: ['Pressured', 'Rushed']
            },
            Stressed: {
                color: '#D7BDE2',
                tertiary: ['Overwhelmed', 'Out of Control']
            },
            Tired: {
                color: '#D7BDE2',
                tertiary: ['Sleepy', 'Unfocused']
            }
        }
    },
    Surprised: {
        color: '#C8E6C9',
        secondary: {
            Startled: {
                color: '#C8E6C9',
                tertiary: ['Shocked', 'Dismayed']
            },
            Confused: {
                color: '#C8E6C9',
                tertiary: ['Disillusioned', 'Perplexed']
            },
            Amazed: {
                color: '#C8E6C9',
                tertiary: ['Astonished', 'Awe']
            },
            Excited: {
                color: '#C8E6C9',
                tertiary: ['Eager', 'Energetic']
            }
        }
    }
};

// State management
let currentView = 'core'; // 'core', 'secondary', 'tertiary'
let selectedCore = null;
let selectedSecondary = null;
let selectedTertiary = null;
let journalEntries = [];
let editingEntryId = null;
let currentCalendarDate = new Date();
let selectedDate = null;
let currentPage = 'wheel'; // 'wheel', 'calendar', 'insights', 'settings'
let settings = {
    darkMode: false,
    reminderEnabled: false,
    reminderTime: '20:00',
    quickEntryEnabled: false,
    onboardingComplete: false,
    bestStreak: 0
};
let currentOnboardingSlide = 1;

// SVG namespace
const svgNS = "http://www.w3.org/2000/svg";

// Initialize the wheel
function init() {
    loadSettings();
    loadJournalEntries();
    applySettings();
    renderCoreEmotions();
    renderCalendar();
    setupEventListeners();
    updateNavigation();
    registerServiceWorker();
    handleInstallPrompt();
    
    // Show onboarding if first time
    if (!settings.onboardingComplete) {
        showOnboarding();
    }
    
    // Schedule reminder check
    checkDailyReminder();
}

// PWA Support
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

let deferredPrompt;

function handleInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Show install button if you want to add one later
        showInstallPromotion();
    });

    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        deferredPrompt = null;
    });
}

function showInstallPromotion() {
    // You can create an install button here if desired
    // For now, the browser will handle the install prompt
    console.log('App can be installed');
}

// Navigation functions
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

function navigateToPage(page) {
    currentPage = page;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    document.getElementById(`${page}-page`).classList.add('active');
    
    // Update navigation
    updateNavigation();
    
    // Close menu
    document.getElementById('nav-menu').classList.remove('active');
    
    // Page-specific actions
    if (page === 'calendar') {
        renderCalendar();
    } else if (page === 'insights') {
        renderInsights();
    }
}

function updateNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        const page = item.getAttribute('data-page');
        if (page === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Setup event listeners for journal form
function setupEventListeners() {
    document.getElementById('save-entry').addEventListener('click', saveJournalEntry);
    document.getElementById('cancel-entry').addEventListener('click', cancelJournalEntry);
    document.getElementById('clear-history').addEventListener('click', clearAllEntries);
    document.getElementById('prev-month').addEventListener('click', () => navigateMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => navigateMonth(1));
    document.getElementById('add-entry-for-date').addEventListener('click', addEntryForSelectedDate);
    
    // Hamburger menu
    document.getElementById('hamburger').addEventListener('click', toggleMenu);
    
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            navigateToPage(page);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
    
    // Formatting toolbar
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const format = btn.getAttribute('data-format');
            document.execCommand(format, false, null);
            document.getElementById('journal-note').focus();
        });
    });
    
    // Search & Filter
    document.getElementById('search-btn').addEventListener('click', performSearch);
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    document.getElementById('emotion-filter').addEventListener('change', performSearch);
    
    // Settings event listeners
    document.getElementById('dark-mode-toggle').addEventListener('change', toggleDarkMode);
    document.getElementById('reminder-toggle').addEventListener('change', toggleReminder);
    document.getElementById('reminder-time').addEventListener('change', updateReminderTime);
    document.getElementById('quick-entry-toggle').addEventListener('change', toggleQuickEntry);
    document.getElementById('export-data').addEventListener('click', exportData);
    document.getElementById('import-data').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file').addEventListener('change', importData);
    document.getElementById('clear-all-data').addEventListener('click', clearAllData);
    
    // Time range buttons for insights
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMoodTimeline(parseInt(btn.dataset.range));
        });
    });
    
    // Onboarding
    document.getElementById('next-onboarding').addEventListener('click', nextOnboardingSlide);
    document.getElementById('skip-onboarding').addEventListener('click', finishOnboarding);
    document.getElementById('finish-onboarding').addEventListener('click', finishOnboarding);
    document.querySelectorAll('.onboarding-dots .dot').forEach(dot => {
        dot.addEventListener('click', () => goToOnboardingSlide(parseInt(dot.dataset.slide)));
    });
}

// Render the core emotions wheel
function renderCoreEmotions() {
    const svg = document.getElementById('mood-wheel');
    svg.innerHTML = '';
    
    const centerX = 400;
    const centerY = 400;
    const radius = 300;
    const coreEmotions = Object.keys(emotionData);
    const anglePerEmotion = (2 * Math.PI) / coreEmotions.length;
    
    coreEmotions.forEach((emotion, index) => {
        const startAngle = index * anglePerEmotion - Math.PI / 2;
        const endAngle = (index + 1) * anglePerEmotion - Math.PI / 2;
        
        // Create path for segment
        const path = createSegmentPath(centerX, centerY, 0, radius, startAngle, endAngle);
        const pathElement = document.createElementNS(svgNS, 'path');
        pathElement.setAttribute('d', path);
        pathElement.setAttribute('fill', emotionData[emotion].color);
        pathElement.setAttribute('stroke', 'white');
        pathElement.setAttribute('stroke-width', '3');
        pathElement.classList.add('emotion-segment');
        pathElement.addEventListener('click', () => handleCoreClick(emotion));
        svg.appendChild(pathElement);
        
        // Add text label
        const midAngle = (startAngle + endAngle) / 2;
        const textRadius = radius * 0.5;
        const textX = centerX + Math.cos(midAngle) * textRadius;
        const textY = centerY + Math.sin(midAngle) * textRadius;
        
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.classList.add('emotion-text', 'core-emotion-text');
        text.textContent = emotion;
        svg.appendChild(text);
    });
}

// Handle core emotion click
function handleCoreClick(emotion) {
    selectedCore = emotion;
    currentView = 'secondary';
    renderSecondaryEmotions(emotion);
    updateSelectionDisplay(`Selected: ${emotion}`);
}

// Render secondary emotions
function renderSecondaryEmotions(coreEmotion) {
    const svg = document.getElementById('mood-wheel');
    svg.innerHTML = '';
    
    const centerX = 400;
    const centerY = 400;
    const innerRadius = 100;
    const outerRadius = 300;
    
    const secondaryEmotions = Object.keys(emotionData[coreEmotion].secondary);
    const anglePerEmotion = (2 * Math.PI) / secondaryEmotions.length;
    
    // Draw core emotion in center
    const coreCircle = document.createElementNS(svgNS, 'circle');
    coreCircle.setAttribute('cx', centerX);
    coreCircle.setAttribute('cy', centerY);
    coreCircle.setAttribute('r', innerRadius);
    coreCircle.setAttribute('fill', emotionData[coreEmotion].color);
    coreCircle.setAttribute('stroke', 'white');
    coreCircle.setAttribute('stroke-width', '3');
    coreCircle.classList.add('emotion-segment');
    coreCircle.addEventListener('click', () => handleBackToCore());
    svg.appendChild(coreCircle);
    
    const coreText = document.createElementNS(svgNS, 'text');
    coreText.setAttribute('x', centerX);
    coreText.setAttribute('y', centerY);
    coreText.setAttribute('text-anchor', 'middle');
    coreText.setAttribute('dominant-baseline', 'middle');
    coreText.classList.add('emotion-text', 'core-emotion-text');
    coreText.textContent = coreEmotion;
    svg.appendChild(coreText);
    
    // Draw secondary emotions
    secondaryEmotions.forEach((emotion, index) => {
        const startAngle = index * anglePerEmotion - Math.PI / 2;
        const endAngle = (index + 1) * anglePerEmotion - Math.PI / 2;
        
        const path = createSegmentPath(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle);
        const pathElement = document.createElementNS(svgNS, 'path');
        pathElement.setAttribute('d', path);
        pathElement.setAttribute('fill', lightenColor(emotionData[coreEmotion].color, 20));
        pathElement.setAttribute('stroke', 'white');
        pathElement.setAttribute('stroke-width', '2');
        pathElement.classList.add('emotion-segment');
        pathElement.addEventListener('click', () => handleSecondaryClick(coreEmotion, emotion));
        svg.appendChild(pathElement);
        
        // Add text label
        const midAngle = (startAngle + endAngle) / 2;
        const textRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const textX = centerX + Math.cos(midAngle) * textRadius;
        const textY = centerY + Math.sin(midAngle) * textRadius;
        
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.classList.add('emotion-text', 'secondary-emotion-text');
        text.textContent = emotion;
        svg.appendChild(text);
    });
}

// Handle secondary emotion click
function handleSecondaryClick(coreEmotion, secondaryEmotion) {
    selectedSecondary = secondaryEmotion;
    
    // If quick entry is enabled, show form directly
    if (settings.quickEntryEnabled) {
        selectedTertiary = null;
        updateSelectionDisplay(`${coreEmotion} → ${secondaryEmotion}`);
        showJournalForm(coreEmotion, secondaryEmotion, null);
        return;
    }
    
    currentView = 'tertiary';
    renderTertiaryEmotions(coreEmotion, secondaryEmotion);
    updateSelectionDisplay(`${coreEmotion} → ${secondaryEmotion}`);
}

// Render tertiary emotions
function renderTertiaryEmotions(coreEmotion, secondaryEmotion) {
    const svg = document.getElementById('mood-wheel');
    svg.innerHTML = '';
    
    const centerX = 400;
    const centerY = 400;
    const coreRadius = 80;
    const secondaryInnerRadius = 100;
    const secondaryOuterRadius = 220;
    const tertiaryInnerRadius = 240;
    const tertiaryOuterRadius = 320;
    
    const secondaryEmotions = Object.keys(emotionData[coreEmotion].secondary);
    const tertiaryEmotions = emotionData[coreEmotion].secondary[secondaryEmotion].tertiary;
    const anglePerSecondary = (2 * Math.PI) / secondaryEmotions.length;
    const anglePerTertiary = anglePerSecondary / tertiaryEmotions.length;
    
    // Find the index of selected secondary emotion
    const secondaryIndex = secondaryEmotions.indexOf(secondaryEmotion);
    const secondaryStartAngle = secondaryIndex * anglePerSecondary - Math.PI / 2;
    const secondaryEndAngle = (secondaryIndex + 1) * anglePerSecondary - Math.PI / 2;
    
    // Draw core emotion in center
    const coreCircle = document.createElementNS(svgNS, 'circle');
    coreCircle.setAttribute('cx', centerX);
    coreCircle.setAttribute('cy', centerY);
    coreCircle.setAttribute('r', coreRadius);
    coreCircle.setAttribute('fill', emotionData[coreEmotion].color);
    coreCircle.setAttribute('stroke', 'white');
    coreCircle.setAttribute('stroke-width', '3');
    coreCircle.classList.add('emotion-segment');
    coreCircle.addEventListener('click', () => handleBackToCore());
    svg.appendChild(coreCircle);
    
    const coreText = document.createElementNS(svgNS, 'text');
    coreText.setAttribute('x', centerX);
    coreText.setAttribute('y', centerY);
    coreText.setAttribute('text-anchor', 'middle');
    coreText.setAttribute('dominant-baseline', 'middle');
    coreText.classList.add('emotion-text', 'core-emotion-text');
    coreText.textContent = coreEmotion;
    svg.appendChild(coreText);
    
    // Draw all secondary emotions (dimmed except selected)
    secondaryEmotions.forEach((emotion, index) => {
        const startAngle = index * anglePerSecondary - Math.PI / 2;
        const endAngle = (index + 1) * anglePerSecondary - Math.PI / 2;
        
        const path = createSegmentPath(centerX, centerY, secondaryInnerRadius, secondaryOuterRadius, startAngle, endAngle);
        const pathElement = document.createElementNS(svgNS, 'path');
        pathElement.setAttribute('d', path);
        
        if (emotion === secondaryEmotion) {
            pathElement.setAttribute('fill', lightenColor(emotionData[coreEmotion].color, 20));
        } else {
            pathElement.setAttribute('fill', lightenColor(emotionData[coreEmotion].color, 40));
            pathElement.setAttribute('opacity', '0.5');
        }
        
        pathElement.setAttribute('stroke', 'white');
        pathElement.setAttribute('stroke-width', '2');
        pathElement.classList.add('emotion-segment');
        pathElement.addEventListener('click', () => handleSecondaryClick(coreEmotion, emotion));
        svg.appendChild(pathElement);
        
        // Add text label
        const midAngle = (startAngle + endAngle) / 2;
        const textRadius = secondaryInnerRadius + (secondaryOuterRadius - secondaryInnerRadius) * 0.5;
        const textX = centerX + Math.cos(midAngle) * textRadius;
        const textY = centerY + Math.sin(midAngle) * textRadius;
        
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.classList.add('emotion-text', 'secondary-emotion-text');
        text.textContent = emotion;
        
        if (emotion !== secondaryEmotion) {
            text.setAttribute('opacity', '0.5');
        }
        
        svg.appendChild(text);
    });
    
    // Draw tertiary emotions
    tertiaryEmotions.forEach((emotion, index) => {
        const startAngle = secondaryStartAngle + (index * anglePerTertiary);
        const endAngle = secondaryStartAngle + ((index + 1) * anglePerTertiary);
        
        const path = createSegmentPath(centerX, centerY, tertiaryInnerRadius, tertiaryOuterRadius, startAngle, endAngle);
        const pathElement = document.createElementNS(svgNS, 'path');
        pathElement.setAttribute('d', path);
        pathElement.setAttribute('fill', lightenColor(emotionData[coreEmotion].color, 0));
        pathElement.setAttribute('stroke', 'white');
        pathElement.setAttribute('stroke-width', '2');
        pathElement.classList.add('emotion-segment');
        pathElement.addEventListener('click', () => handleTertiaryClick(coreEmotion, secondaryEmotion, emotion));
        svg.appendChild(pathElement);
        
        // Add text label
        const midAngle = (startAngle + endAngle) / 2;
        const textRadius = tertiaryInnerRadius + (tertiaryOuterRadius - tertiaryInnerRadius) * 0.5;
        const textX = centerX + Math.cos(midAngle) * textRadius;
        const textY = centerY + Math.sin(midAngle) * textRadius;
        
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.classList.add('emotion-text', 'tertiary-emotion-text');
        text.textContent = emotion;
        svg.appendChild(text);
    });
}

// Handle tertiary emotion click
function handleTertiaryClick(coreEmotion, secondaryEmotion, tertiaryEmotion) {
    selectedTertiary = tertiaryEmotion;
    updateSelectionDisplay(`${coreEmotion} → ${secondaryEmotion} → ${tertiaryEmotion}`);
    showJournalForm(coreEmotion, secondaryEmotion, tertiaryEmotion);
}

// Handle back to core
function handleBackToCore() {
    selectedCore = null;
    selectedSecondary = null;
    selectedTertiary = null;
    currentView = 'core';
    renderCoreEmotions();
    updateSelectionDisplay('');
    hideJournalForm();
}

// Create SVG path for a segment
function createSegmentPath(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle) {
    const x1 = centerX + Math.cos(startAngle) * innerRadius;
    const y1 = centerY + Math.sin(startAngle) * innerRadius;
    const x2 = centerX + Math.cos(endAngle) * innerRadius;
    const y2 = centerY + Math.sin(endAngle) * innerRadius;
    const x3 = centerX + Math.cos(endAngle) * outerRadius;
    const y3 = centerY + Math.sin(endAngle) * outerRadius;
    const x4 = centerX + Math.cos(startAngle) * outerRadius;
    const y4 = centerY + Math.sin(startAngle) * outerRadius;
    
    const largeArcFlag = (endAngle - startAngle) > Math.PI ? 1 : 0;
    
    if (innerRadius === 0) {
        // Pie slice from center
        return `M ${centerX} ${centerY} L ${x4} ${y4} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3} Z`;
    } else {
        // Ring segment
        return `M ${x1} ${y1} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
    }
}

// Lighten color helper
function lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// Update selection display
function updateSelectionDisplay(text) {
    const display = document.getElementById('selected-emotion');
    display.textContent = text;
}

// Journal functionality
function showJournalForm(coreEmotion, secondaryEmotion, tertiaryEmotion, entry = null) {
    const form = document.getElementById('journal-form');
    const emotionPath = document.getElementById('entry-emotion-path');
    const noteDiv = document.getElementById('journal-note');
    const formTitle = document.getElementById('form-title');
    const dateInput = document.getElementById('entry-date');
    const timeInput = document.getElementById('entry-time');
    
    // Build emotion path display
    let pathText = coreEmotion;
    if (secondaryEmotion) pathText += ` → ${secondaryEmotion}`;
    if (tertiaryEmotion) pathText += ` → ${tertiaryEmotion}`;
    
    if (entry) {
        // Edit mode
        editingEntryId = entry.id;
        formTitle.textContent = 'Edit Journal Entry';
        emotionPath.textContent = pathText;
        noteDiv.innerHTML = entry.note || '';
        selectedCore = entry.coreEmotion;
        selectedSecondary = entry.secondaryEmotion;
        selectedTertiary = entry.tertiaryEmotion;
        
        // Set date and time from entry
        const entryDate = new Date(entry.timestamp);
        dateInput.value = entryDate.toISOString().split('T')[0];
        timeInput.value = entryDate.toTimeString().slice(0, 5);
    } else {
        // New entry mode
        editingEntryId = null;
        formTitle.textContent = 'Add Journal Entry';
        emotionPath.textContent = pathText;
        noteDiv.innerHTML = '';
        
        // Check if there's a pending entry date from calendar
        if (window.pendingEntryDate) {
            const pendingDate = window.pendingEntryDate;
            dateInput.value = pendingDate.toISOString().split('T')[0];
            // Set time to current time
            const now = new Date();
            timeInput.value = now.toTimeString().slice(0, 5);
            // Clear the pending date
            window.pendingEntryDate = null;
        } else {
            // Set default date and time to now
            const now = new Date();
            dateInput.value = now.toISOString().split('T')[0];
            timeInput.value = now.toTimeString().slice(0, 5);
        }
    }
    
    form.classList.remove('hidden');
    noteDiv.focus();
}

function hideJournalForm() {
    const form = document.getElementById('journal-form');
    form.classList.add('hidden');
    document.getElementById('journal-note').innerHTML = '';
    editingEntryId = null;
}

function saveJournalEntry() {
    const noteDiv = document.getElementById('journal-note');
    const note = noteDiv.innerHTML.trim();
    const dateInput = document.getElementById('entry-date');
    const timeInput = document.getElementById('entry-time');
    
    // Combine date and time inputs
    const selectedDateTime = new Date(`${dateInput.value}T${timeInput.value}`);
    
    if (editingEntryId) {
        // Update existing entry
        const entryIndex = journalEntries.findIndex(e => e.id === editingEntryId);
        if (entryIndex !== -1) {
            journalEntries[entryIndex].note = note;
            journalEntries[entryIndex].timestamp = selectedDateTime.toISOString();
            journalEntries[entryIndex].lastEdited = new Date().toISOString();
        }
    } else {
        // Create new entry
        const entry = {
            id: Date.now(),
            timestamp: selectedDateTime.toISOString(),
            coreEmotion: selectedCore,
            secondaryEmotion: selectedSecondary,
            tertiaryEmotion: selectedTertiary,
            note: note
        };
        journalEntries.push(entry);
    }
    
    // Sort entries by timestamp (newest first)
    journalEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    saveJournalEntries();
    
    // Navigate to calendar page
    navigateToPage('calendar');
    
    // Navigate to the month of the entry
    currentCalendarDate = new Date(selectedDateTime);
    renderCalendar();
    
    // Auto-select the date
    selectedDate = new Date(selectedDateTime.toISOString().split('T')[0]);
    renderEntriesForDate(selectedDate);
    
    hideJournalForm();
    
    if (!editingEntryId) {
        handleBackToCore();
    }
    
    // Show success message
    updateSelectionDisplay(editingEntryId ? 'Entry updated! ✓' : 'Entry saved! ✓');
    setTimeout(() => updateSelectionDisplay(''), 2000);
}

function cancelJournalEntry() {
    hideJournalForm();
}

function deleteEntry(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        journalEntries = journalEntries.filter(entry => entry.id !== id);
        saveJournalEntries();
        renderCalendar();
        if (selectedDate) {
            renderEntriesForDate(selectedDate);
        }
    }
}

function editEntry(id) {
    const entry = journalEntries.find(e => e.id === id);
    if (entry) {
        // Navigate to wheel page
        navigateToPage('wheel');
        
        // Render the appropriate wheel view based on the entry
        selectedCore = entry.coreEmotion;
        selectedSecondary = entry.secondaryEmotion;
        selectedTertiary = entry.tertiaryEmotion;
        
        // Show the tertiary view with the entry's emotions
        currentView = 'tertiary';
        renderTertiaryEmotions(entry.coreEmotion, entry.secondaryEmotion);
        
        // Show the journal form with entry data
        showJournalForm(entry.coreEmotion, entry.secondaryEmotion, entry.tertiaryEmotion, entry);
        
        // Scroll to form after a brief delay
        setTimeout(() => {
            document.getElementById('journal-form').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

function clearAllEntries() {
    if (confirm('Are you sure you want to delete all journal entries? This cannot be undone.')) {
        journalEntries = [];
        saveJournalEntries();
        renderCalendar();
        selectedDate = null;
        document.getElementById('entries-container').innerHTML = '';
        document.getElementById('selected-date-title').textContent = '';
        document.getElementById('add-entry-for-date').classList.add('hidden');
    }
}

function addEntryForSelectedDate() {
    if (!selectedDate) return;
    
    // Store the selected date for later use
    const dateForEntry = new Date(selectedDate);
    
    // Navigate to wheel page
    navigateToPage('wheel');
    
    // Scroll to wheel
    setTimeout(() => {
        document.getElementById('wheel-container').scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Store the date so it can be used when an emotion is selected
    window.pendingEntryDate = dateForEntry;
    
    // Show message to user
    updateSelectionDisplay('Select an emotion to add an entry for ' + dateForEntry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
}

function loadJournalEntries() {
    const stored = localStorage.getItem('moodJournalEntries');
    if (stored) {
        journalEntries = JSON.parse(stored);
    }
}

function saveJournalEntries() {
    localStorage.setItem('moodJournalEntries', JSON.stringify(journalEntries));
}

// Calendar functionality
function navigateMonth(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    renderCalendar();
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Get previous month's last days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Create calendar grid
    const calendarContainer = document.getElementById('calendar-container');
    let html = '<div class="calendar-grid">';
    
    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        html += `<div class="calendar-day-header">${day}</div>`;
    });
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        html += `<div class="calendar-day other-month"><span class="day-number">${day}</span></div>`;
    }
    
    // Current month's days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDateKey(date);
        const entriesForDay = getEntriesForDate(date);
        
        const isToday = date.toDateString() === today.toDateString();
        const hasEntries = entriesForDay.length > 0;
        const isSelected = selectedDate && formatDateKey(selectedDate) === dateStr;
        
        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (hasEntries) classes += ' has-entries';
        if (isSelected) classes += ' selected';
        
        html += `<div class="${classes}" onclick="selectDate(new Date(${year}, ${month}, ${day}))">`;
        html += `<span class="day-number">${day}</span>`;
        
        if (hasEntries) {
            html += '<div class="day-indicators">';
            const emotions = entriesForDay.map(e => e.coreEmotion);
            const uniqueEmotions = [...new Set(emotions)].slice(0, 3); // Show up to 3
            uniqueEmotions.forEach(emotion => {
                const color = emotionData[emotion]?.color || '#999';
                html += `<span class="emotion-dot" style="background-color: ${color}"></span>`;
            });
            html += '</div>';
        }
        
        html += '</div>';
    }
    
    // Next month's leading days
    const totalCells = startingDayOfWeek + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let day = 1; day <= remainingCells; day++) {
        html += `<div class="calendar-day other-month"><span class="day-number">${day}</span></div>`;
    }
    
    html += '</div>';
    calendarContainer.innerHTML = html;
}

function selectDate(date) {
    selectedDate = date;
    renderCalendar();
    renderEntriesForDate(date);
    
    // Show add entry button
    const addButton = document.getElementById('add-entry-for-date');
    addButton.classList.remove('hidden');
    
    document.getElementById('selected-date-entries').scrollIntoView({ behavior: 'smooth' });
}

function formatDateKey(date) {
    return date.toISOString().split('T')[0];
}

function getEntriesForDate(date) {
    const dateKey = formatDateKey(date);
    return journalEntries.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        return formatDateKey(entryDate) === dateKey;
    });
}

function renderEntriesForDate(date) {
    const container = document.getElementById('entries-container');
    const titleElement = document.getElementById('selected-date-title');
    const addButton = document.getElementById('add-entry-for-date');
    
    const entries = getEntriesForDate(date);
    
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    titleElement.textContent = formattedDate;
    addButton.classList.remove('hidden');
    
    if (entries.length === 0) {
        container.innerHTML = '<div class="no-entries">No entries for this date.</div>';
        return;
    }
    
    container.innerHTML = entries.map(entry => {
        const time = new Date(entry.timestamp);
        const formattedTime = time.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
        });
        
        const editedTag = entry.lastEdited ? ' <em>(edited)</em>' : '';
        
        // Build emotion path
        let emotionPath = entry.coreEmotion;
        if (entry.secondaryEmotion) emotionPath += ` → ${entry.secondaryEmotion}`;
        if (entry.tertiaryEmotion) emotionPath += ` → ${entry.tertiaryEmotion}`;
        
        return `
            <div class="journal-entry">
                <div class="entry-header">
                    <div class="entry-emotion">${emotionPath}</div>
                    <div class="entry-timestamp">${formattedTime}${editedTag}</div>
                </div>
                ${entry.note ? `<div class="entry-note">${entry.note}</div>` : ''}
                <div class="entry-actions">
                    <button class="entry-edit" onclick="editEntry(${entry.id})">Edit</button>
                    <button class="entry-delete" onclick="deleteEntry(${entry.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

// Search & Filter functionality
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const emotionFilter = document.getElementById('emotion-filter').value;
    
    let filteredEntries = journalEntries;
    
    if (emotionFilter) {
        filteredEntries = filteredEntries.filter(e => e.coreEmotion === emotionFilter);
    }
    
    if (searchTerm) {
        filteredEntries = filteredEntries.filter(e => {
            const noteText = e.note ? e.note.toLowerCase().replace(/<[^>]*>/g, '') : '';
            const emotions = `${e.coreEmotion} ${e.secondaryEmotion || ''} ${e.tertiaryEmotion || ''}`.toLowerCase();
            return noteText.includes(searchTerm) || emotions.includes(searchTerm);
        });
    }
    
    renderSearchResults(filteredEntries);
}

function renderSearchResults(entries) {
    const container = document.getElementById('entries-container');
    const titleElement = document.getElementById('selected-date-title');
    
    titleElement.textContent = `Search Results (${entries.length} entries)`;
    document.getElementById('add-entry-for-date').classList.add('hidden');
    
    if (entries.length === 0) {
        container.innerHTML = '<div class="no-entries">No entries found matching your search.</div>';
        return;
    }
    
    container.innerHTML = entries.map(entry => {
        const date = new Date(entry.timestamp);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
        });
        
        let emotionPath = entry.coreEmotion;
        if (entry.secondaryEmotion) emotionPath += ` → ${entry.secondaryEmotion}`;
        if (entry.tertiaryEmotion) emotionPath += ` → ${entry.tertiaryEmotion}`;
        
        return `
            <div class="journal-entry">
                <div class="entry-header">
                    <div class="entry-emotion">${emotionPath}</div>
                    <div class="entry-timestamp">${formattedDate} at ${formattedTime}</div>
                </div>
                ${entry.note ? `<div class="entry-note">${entry.note}</div>` : ''}
                <div class="entry-actions">
                    <button class="entry-edit" onclick="editEntry(${entry.id})">Edit</button>
                    <button class="entry-delete" onclick="deleteEntry(${entry.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

// Insights functionality
function renderInsights() {
    renderStreakCard();
    renderStatsOverview();
    renderEmotionBreakdown();
    renderMoodTimeline(7);
    renderTimeDistribution();
    renderWeeklyPattern();
}

function calculateStreak() {
    if (journalEntries.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);
    
    // Check if there's an entry today
    const hasEntryToday = journalEntries.some(e => {
        const entryDate = new Date(e.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === today.getTime();
    });
    
    if (!hasEntryToday) {
        // Check yesterday
        currentDate.setDate(currentDate.getDate() - 1);
    }
    
    while (true) {
        const hasEntry = journalEntries.some(e => {
            const entryDate = new Date(e.timestamp);
            entryDate.setHours(0, 0, 0, 0);
            return entryDate.getTime() === currentDate.getTime();
        });
        
        if (hasEntry) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    // Update best streak
    if (streak > settings.bestStreak) {
        settings.bestStreak = streak;
        saveSettings();
    }
    
    return streak;
}

function renderStreakCard() {
    const streak = calculateStreak();
    document.getElementById('current-streak').textContent = streak;
    document.getElementById('best-streak').textContent = settings.bestStreak;
}

function renderStatsOverview() {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const thisWeek = journalEntries.filter(e => new Date(e.timestamp) >= oneWeekAgo).length;
    const thisMonth = journalEntries.filter(e => new Date(e.timestamp) >= oneMonthAgo).length;
    
    // Calculate days with entries
    const uniqueDays = new Set(journalEntries.map(e => {
        const d = new Date(e.timestamp);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }));
    
    const avgPerDay = uniqueDays.size > 0 ? (journalEntries.length / uniqueDays.size).toFixed(1) : 0;
    
    document.getElementById('total-entries').textContent = journalEntries.length;
    document.getElementById('this-week').textContent = thisWeek;
    document.getElementById('this-month').textContent = thisMonth;
    document.getElementById('avg-per-day').textContent = avgPerDay;
}

function renderEmotionBreakdown() {
    const container = document.getElementById('emotion-breakdown');
    
    // Count emotions
    const emotionCounts = {};
    journalEntries.forEach(e => {
        emotionCounts[e.coreEmotion] = (emotionCounts[e.coreEmotion] || 0) + 1;
    });
    
    const total = journalEntries.length || 1;
    const sortedEmotions = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]);
    
    if (sortedEmotions.length === 0) {
        container.innerHTML = '<p class="no-entries">No data yet. Start logging your moods!</p>';
        return;
    }
    
    container.innerHTML = sortedEmotions.map(([emotion, count]) => {
        const percentage = (count / total * 100).toFixed(0);
        const color = emotionData[emotion]?.color || '#999';
        
        return `
            <div class="emotion-bar-container">
                <span class="emotion-bar-label">${emotion}</span>
                <div class="emotion-bar-wrapper">
                    <div class="emotion-bar" style="width: ${percentage}%; background-color: ${color};">
                        <span class="emotion-bar-count">${count}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderMoodTimeline(days) {
    const container = document.getElementById('mood-timeline');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let html = '';
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const entries = getEntriesForDate(date);
        const dayNum = date.getDate();
        
        if (entries.length > 0) {
            // Use the most common core emotion for that day
            const emotionCounts = {};
            entries.forEach(e => {
                emotionCounts[e.coreEmotion] = (emotionCounts[e.coreEmotion] || 0) + 1;
            });
            const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0][0];
            const color = emotionData[topEmotion]?.color || '#999';
            
            html += `<div class="timeline-day" style="background-color: ${color};" title="${date.toDateString()}: ${entries.length} entries (${topEmotion})">${dayNum}</div>`;
        } else {
            html += `<div class="timeline-day empty" title="${date.toDateString()}: No entries">${dayNum}</div>`;
        }
    }
    
    container.innerHTML = html;
}

function renderTimeDistribution() {
    const container = document.getElementById('time-distribution');
    
    const timeSlots = {
        'Morning': { count: 0, range: '6AM-12PM' },
        'Afternoon': { count: 0, range: '12PM-6PM' },
        'Evening': { count: 0, range: '6PM-10PM' },
        'Night': { count: 0, range: '10PM-6AM' }
    };
    
    journalEntries.forEach(e => {
        const hour = new Date(e.timestamp).getHours();
        if (hour >= 6 && hour < 12) timeSlots['Morning'].count++;
        else if (hour >= 12 && hour < 18) timeSlots['Afternoon'].count++;
        else if (hour >= 18 && hour < 22) timeSlots['Evening'].count++;
        else timeSlots['Night'].count++;
    });
    
    const maxCount = Math.max(...Object.values(timeSlots).map(s => s.count), 1);
    
    container.innerHTML = Object.entries(timeSlots).map(([name, data]) => {
        const height = (data.count / maxCount) * 100;
        return `
            <div class="time-slot">
                <div class="time-bar" style="height: ${height}px;" title="${data.count} entries"></div>
                <span class="time-label">${name}</span>
            </div>
        `;
    }).join('');
}

function renderWeeklyPattern() {
    const container = document.getElementById('weekly-pattern');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    
    journalEntries.forEach(e => {
        const day = new Date(e.timestamp).getDay();
        dayCounts[day]++;
    });
    
    const maxCount = Math.max(...dayCounts, 1);
    
    container.innerHTML = days.map((day, index) => {
        const height = (dayCounts[index] / maxCount) * 80;
        return `
            <div class="day-column">
                <span class="day-count">${dayCounts[index]}</span>
                <div class="day-bar" style="height: ${height}px;"></div>
                <span class="day-label">${day}</span>
            </div>
        `;
    }).join('');
}

// Settings functionality
function loadSettings() {
    const stored = localStorage.getItem('moodJournalSettings');
    if (stored) {
        settings = { ...settings, ...JSON.parse(stored) };
    }
}

function saveSettings() {
    localStorage.setItem('moodJournalSettings', JSON.stringify(settings));
}

function applySettings() {
    // Apply dark mode
    if (settings.darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-toggle').checked = true;
    }
    
    // Apply reminder settings
    document.getElementById('reminder-toggle').checked = settings.reminderEnabled;
    document.getElementById('reminder-time').value = settings.reminderTime;
    
    // Apply quick entry setting
    document.getElementById('quick-entry-toggle').checked = settings.quickEntryEnabled;
}

function toggleDarkMode() {
    settings.darkMode = document.getElementById('dark-mode-toggle').checked;
    document.body.classList.toggle('dark-mode', settings.darkMode);
    saveSettings();
    showToast('Theme updated', 'success');
}

function toggleReminder() {
    settings.reminderEnabled = document.getElementById('reminder-toggle').checked;
    saveSettings();
    
    if (settings.reminderEnabled) {
        requestNotificationPermission();
        showToast('Daily reminder enabled', 'success');
    } else {
        showToast('Daily reminder disabled', 'info');
    }
}

function updateReminderTime() {
    settings.reminderTime = document.getElementById('reminder-time').value;
    saveSettings();
    showToast('Reminder time updated', 'success');
}

function toggleQuickEntry() {
    settings.quickEntryEnabled = document.getElementById('quick-entry-toggle').checked;
    saveSettings();
    showToast(settings.quickEntryEnabled ? 'Quick entry enabled' : 'Quick entry disabled', 'success');
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission();
    }
}

function checkDailyReminder() {
    if (!settings.reminderEnabled) return;
    
    const now = new Date();
    const [hours, minutes] = settings.reminderTime.split(':').map(Number);
    
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);
    
    // If reminder time has passed today, schedule for tomorrow
    if (now > reminderTime) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const delay = reminderTime.getTime() - now.getTime();
    
    setTimeout(() => {
        showReminderNotification();
        // Schedule next reminder
        checkDailyReminder();
    }, delay);
}

function showReminderNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Mood Journal', {
            body: 'How are you feeling today? Take a moment to log your mood.',
            icon: 'icon-192.png'
        });
    }
}

// Data export/import
function exportData() {
    const data = {
        entries: journalEntries,
        settings: settings,
        exportDate: new Date().toISOString(),
        version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `mood-journal-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('Data exported successfully', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.entries && Array.isArray(data.entries)) {
                if (confirm(`Import ${data.entries.length} entries? This will merge with existing data.`)) {
                    // Merge entries (avoid duplicates by ID)
                    const existingIds = new Set(journalEntries.map(e => e.id));
                    const newEntries = data.entries.filter(e => !existingIds.has(e.id));
                    journalEntries = [...journalEntries, ...newEntries];
                    journalEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    saveJournalEntries();
                    
                    renderCalendar();
                    showToast(`Imported ${newEntries.length} new entries`, 'success');
                }
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            showToast('Error importing data: Invalid file format', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
}

function clearAllData() {
    if (confirm('Are you sure you want to delete ALL data including settings? This cannot be undone.')) {
        journalEntries = [];
        settings = {
            darkMode: false,
            reminderEnabled: false,
            reminderTime: '20:00',
            quickEntryEnabled: false,
            onboardingComplete: true,
            bestStreak: 0
        };
        
        localStorage.removeItem('moodJournalEntries');
        localStorage.removeItem('moodJournalSettings');
        
        saveJournalEntries();
        saveSettings();
        
        location.reload();
    }
}

// Onboarding
function showOnboarding() {
    document.getElementById('onboarding-modal').classList.remove('hidden');
}

function nextOnboardingSlide() {
    if (currentOnboardingSlide < 4) {
        currentOnboardingSlide++;
        goToOnboardingSlide(currentOnboardingSlide);
    }
}

function goToOnboardingSlide(slideNum) {
    currentOnboardingSlide = slideNum;
    
    document.querySelectorAll('.onboarding-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    document.querySelector(`.onboarding-slide[data-slide="${slideNum}"]`).classList.add('active');
    
    document.querySelectorAll('.onboarding-dots .dot').forEach(dot => {
        dot.classList.remove('active');
    });
    document.querySelector(`.dot[data-slide="${slideNum}"]`).classList.add('active');
    
    // Show/hide buttons
    if (slideNum === 4) {
        document.getElementById('next-onboarding').classList.add('hidden');
        document.getElementById('finish-onboarding').classList.remove('hidden');
    } else {
        document.getElementById('next-onboarding').classList.remove('hidden');
        document.getElementById('finish-onboarding').classList.add('hidden');
    }
}

function finishOnboarding() {
    settings.onboardingComplete = true;
    saveSettings();
    document.getElementById('onboarding-modal').classList.add('hidden');
    showToast('Welcome to Mood Journal! 🎉', 'success');
}

// Toast notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
