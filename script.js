// Flip-Flop Interactive Educational Website
// JavaScript for animations and interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize interactive demos
    initSRFlipFlop();
    initJKFlipFlop();
    initDFlipFlop();
    initTFlipFlop();
    initMasterSlave();
    initTimingDiagrams();
    initApplications();
    
    // Initialize type item navigation
    initTypeItems();
});

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}


// ==================== NAVIGATION ====================
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    // Trigger animations when section becomes visible
                    triggerSectionAnimations(section);
                }
            });
        });
    });
}

function triggerSectionAnimations(section) {
    // Add entrance animations to elements in the section
    const animatedElements = section.querySelectorAll('.concept-card, .truth-table tbody tr, .circuit-diagram');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.5s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ==================== TYPE ITEMS NAVIGATION ====================
function initTypeItems() {
    const typeItems = document.querySelectorAll('.type-item');
    const typeToSection = {
        'sr': 'sr',
        'jk': 'jk',
        'd': 'd',
        't': 't'
    };
    
    typeItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.dataset.type;
            const section = typeToSection[type];
            
            if (section) {
                // Trigger click on corresponding nav button
                const navBtn = document.querySelector(`[data-section="${section}"]`);
                if (navBtn) {
                    navBtn.click();
                }
            }
        });
    });
}

// ==================== SR FLIP-FLOP ====================
function initSRFlipFlop() {
    let sValue = 0;
    let rValue = 0;
    let qState = 0;
    let nqState = 1;
    
    const sButtons = document.querySelectorAll('[data-input="s"]');
    const rButtons = document.querySelectorAll('[data-input="r"]');
    const qLed = document.getElementById('sr-q-led');
    const nqLed = document.getElementById('sr-nq-led');
    const statusEl = document.getElementById('sr-status');
    const truthTableRows = document.querySelectorAll('#sr-truth-table tbody tr');
    
    // Truth table hover effects
    truthTableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            truthTableRows.forEach(r => r.classList.remove('highlighted'));
            row.classList.add('highlighted');
        });
        
        row.addEventListener('mouseleave', () => {
            row.classList.remove('highlighted');
        });
    });
    
    // S input buttons
    sButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            sValue = parseInt(btn.dataset.value);
            updateSRState();
        });
    });
    
    // R input buttons
    rButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            rButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            rValue = parseInt(btn.dataset.value);
            updateSRState();
        });
    });
    
    function updateSRState() {
        let description = '';
        
        // SR Flip-Flop logic
        if (sValue === 0 && rValue === 0) {
            // Hold state - no change
            description = 'Hold State';
        } else if (sValue === 0 && rValue === 1) {
            // Reset
            qState = 0;
            nqState = 1;
            description = 'Reset (Q = 0)';
        } else if (sValue === 1 && rValue === 0) {
            // Set
            qState = 1;
            nqState = 0;
            description = 'Set (Q = 1)';
        } else if (sValue === 1 && rValue === 1) {
            // Invalid state
            qState = 0;
            nqState = 0;
            description = '⚠️ INVALID STATE!';
        }
        
        // Update LEDs with animation
        updateLED(qLed, qState);
        updateLED(nqLed, nqState);
        statusEl.textContent = description;
        
        // Highlight corresponding truth table row
        const inputKey = `${sValue}${rValue}`;
        truthTableRows.forEach(row => {
            if (row.dataset.inputs === inputKey) {
                row.classList.add('highlighted');
                setTimeout(() => row.classList.remove('highlighted'), 1000);
            }
        });
    }
    
    function updateLED(led, value) {
        if (value === 1) {
            led.classList.add('on');
            led.textContent = '1';
        } else {
            led.classList.remove('on');
            led.textContent = '0';
        }
    }
    
    // Set initial state
    sButtons[0].classList.add('active');
    rButtons[0].classList.add('active');
}

// ==================== JK FLIP-FLOP ====================
function initJKFlipFlop() {
    let jValue = 0;
    let kValue = 0;
    let qState = 0;
    let nqState = 1;
    
    const jButtons = document.querySelectorAll('[data-input="j"]');
    const kButtons = document.querySelectorAll('[data-input="k"]');
    const clockBtn = document.getElementById('jk-clock-btn');
    const qLed = document.getElementById('jk-q-led');
    const nqLed = document.getElementById('jk-nq-led');
    const statusEl = document.getElementById('jk-status');
    const truthTableRows = document.querySelectorAll('#jk-truth-table tbody tr');
    
    // Truth table hover effects
    truthTableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            truthTableRows.forEach(r => r.classList.remove('highlighted'));
            row.classList.add('highlighted');
        });
        
        row.addEventListener('mouseleave', () => {
            row.classList.remove('highlighted');
        });
    });
    
    // J input buttons
    jButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            jButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            jValue = parseInt(btn.dataset.value);
            updateJKDisplay();
        });
    });
    
    // K input buttons
    kButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            kButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            kValue = parseInt(btn.dataset.value);
            updateJKDisplay();
        });
    });
    
    // Clock button
    clockBtn.addEventListener('click', () => {
        // Animate clock button
        clockBtn.style.transform = 'scale(0.95)';
        setTimeout(() => clockBtn.style.transform = '', 100);
        
        // JK Flip-Flop logic on clock edge
        if (jValue === 0 && kValue === 0) {
            // Hold - no change
        } else if (jValue === 0 && kValue === 1) {
            // Reset
            qState = 0;
            nqState = 1;
        } else if (jValue === 1 && kValue === 0) {
            // Set
            qState = 1;
            nqState = 0;
        } else if (jValue === 1 && kValue === 1) {
            // Toggle
            const temp = qState;
            qState = nqState;
            nqState = temp;
        }
        
        updateJKLeds();
    });
    
    function updateJKDisplay() {
        let description = '';
        
        if (jValue === 0 && kValue === 0) {
            description = 'Hold - Waiting for clock...';
        } else if (jValue === 0 && kValue === 1) {
            description = 'Reset on next clock';
        } else if (jValue === 1 && kValue === 0) {
            description = 'Set on next clock';
        } else if (jValue === 1 && kValue === 1) {
            description = 'Toggle on next clock';
        }
        
        statusEl.textContent = description;
    }
    
    function updateJKLeds() {
        updateLED(qLed, qState);
        updateLED(nqLed, nqState);
        
        // Highlight corresponding truth table row
        const inputKey = `${jValue}${kValue}`;
        truthTableRows.forEach(row => {
            if (row.dataset.inputs === inputKey) {
                row.classList.add('highlighted');
                setTimeout(() => row.classList.remove('highlighted'), 1000);
            }
        });
    }
    
    function updateLED(led, value) {
        if (value === 1) {
            led.classList.add('on');
            led.textContent = '1';
        } else {
            led.classList.remove('on');
            led.textContent = '0';
        }
    }
    
    // Set initial state
    jButtons[0].classList.add('active');
    kButtons[0].classList.add('active');
    updateJKDisplay();
}

// ==================== D FLIP-FLOP ====================
function initDFlipFlop() {
    let dValue = 0;
    let qState = 0;
    let nqState = 1;
    
    const dButtons = document.querySelectorAll('[data-input="d"]');
    const clockBtn = document.getElementById('d-clock-btn');
    const qLed = document.getElementById('d-q-led');
    const nqLed = document.getElementById('d-nq-led');
    const statusEl = document.getElementById('d-status');
    const truthTableRows = document.querySelectorAll('#d-truth-table tbody tr');
    
    // Truth table hover effects
    truthTableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            truthTableRows.forEach(r => r.classList.remove('highlighted'));
            row.classList.add('highlighted');
        });
        
        row.addEventListener('mouseleave', () => {
            row.classList.remove('highlighted');
        });
    });
    
    // D input buttons
    dButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            dButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            dValue = parseInt(btn.dataset.value);
            statusEl.textContent = `D = ${dValue} - Waiting for clock edge...`;
        });
    });
    
    // Clock button
    clockBtn.addEventListener('click', () => {
        // Animate clock button
        clockBtn.style.transform = 'scale(0.95)';
        setTimeout(() => clockBtn.style.transform = '', 100);
        
        // D Flip-Flop captures D on clock edge
        qState = dValue;
        nqState = dValue === 1 ? 0 : 1;
        
        updateDLeds();
        
        // Highlight corresponding truth table row
        const inputKey = `${dValue}`;
        truthTableRows.forEach(row => {
            if (row.dataset.inputs === inputKey) {
                row.classList.add('highlighted');
                setTimeout(() => row.classList.remove('highlighted'), 1000);
            }
        });
        
        statusEl.textContent = `Captured D = ${dValue} on clock edge!`;
    });
    
    function updateDLeds() {
        updateLED(qLed, qState);
        updateLED(nqLed, nqState);
    }
    
    function updateLED(led, value) {
        if (value === 1) {
            led.classList.add('on');
            led.textContent = '1';
        } else {
            led.classList.remove('on');
            led.textContent = '0';
        }
    }
    
    // Set initial state
    dButtons[0].classList.add('active');
    statusEl.textContent = 'D = 0 - Waiting for clock edge...';
}

// ==================== T FLIP-FLOP ====================
function initTFlipFlop() {
    let tValue = 0;
    let qState = 0;
    
    const tButtons = document.querySelectorAll('[data-input="t"]');
    const clockBtn = document.getElementById('t-clock-btn');
    const qLed = document.getElementById('t-q-led');
    const statusEl = document.getElementById('t-status');
    const truthTableRows = document.querySelectorAll('#t-truth-table tbody tr');
    
    // Truth table hover effects
    truthTableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            truthTableRows.forEach(r => r.classList.remove('highlighted'));
            row.classList.add('highlighted');
        });
        
        row.addEventListener('mouseleave', () => {
            row.classList.remove('highlighted');
        });
    });
    
    // T input buttons
    tButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tValue = parseInt(btn.dataset.value);
            
            if (tValue === 0) {
                statusEl.textContent = 'Hold - Waiting for clock...';
            } else {
                statusEl.textContent = 'Toggle on next clock...';
            }
        });
    });
    
    // Clock button
    clockBtn.addEventListener('click', () => {
        // Animate clock button
        clockBtn.style.transform = 'scale(0.95)';
        setTimeout(() => clockBtn.style.transform = '', 100);
        
        // T Flip-Flop logic on clock edge
        if (tValue === 1) {
            // Toggle
            qState = qState === 1 ? 0 : 1;
        }
        // If T=0, hold state - no change
        
        updateTLeds();
        
        // Highlight corresponding truth table row
        const inputKey = `${tValue}`;
        truthTableRows.forEach(row => {
            if (row.dataset.inputs === inputKey) {
                row.classList.add('highlighted');
                setTimeout(() => row.classList.remove('highlighted'), 1000);
            }
        });
        
        if (tValue === 0) {
            statusEl.textContent = 'Hold - Waiting for clock...';
        } else {
            statusEl.textContent = `Toggled! Q = ${qState}`;
        }
    });
    
    function updateTLeds() {
        updateLED(qLed, qState);
    }
    
    function updateLED(led, value) {
        if (value === 1) {
            led.classList.add('on');
            led.textContent = '1';
        } else {
            led.classList.remove('on');
            led.textContent = '0';
        }
    }
    
    // Set initial state
    tButtons[0].classList.add('active');
    statusEl.textContent = 'Hold - Waiting for clock...';
}

// ==================== MASTER-SLAVE ====================
function initMasterSlave() {
    const animateBtn = document.getElementById('ms-animate-btn');
    const masterState = document.getElementById('ms-master-state');
    const slaveState = document.getElementById('ms-slave-state');
    
    if (animateBtn) {
        animateBtn.addEventListener('click', () => {
            // Disable button during animation
            animateBtn.disabled = true;
            animateBtn.textContent = 'Animating...';
            
            // Phase 1: CLK = 0, Master active, Slave held
            masterState.textContent = 'Active (Latches Input)';
            masterState.classList.add('active');
            slaveState.textContent = 'Hold (Previous State)';
            slaveState.classList.remove('active');
            
            setTimeout(() => {
                // Phase 2: CLK = 1, Master held, Slave active
                masterState.textContent = 'Hold (Input Latched)';
                masterState.classList.remove('active');
                slaveState.textContent = 'Active (Transfers to Output)';
                slaveState.classList.add('active');
                
                setTimeout(() => {
                    // Reset
                    masterState.textContent = 'Active (Latches)';
                    masterState.classList.add('active');
                    slaveState.textContent = 'Hold';
                    slaveState.classList.remove('active');
                    
                    setTimeout(() => {
                        animateBtn.disabled = false;
                        animateBtn.textContent = 'Play Animation';
                        
                        // Clean up
                        masterState.classList.remove('active');
                    }, 1000);
                }, 1500);
            }, 1500);
        });
    }
}

// ==================== TIMING DIAGRAMS ====================
function initTimingDiagrams() {
    // Metastability animation
    const metaAnimateBtn = document.getElementById('meta-animate-btn');
    const metaSignal = document.getElementById('meta-signal');
    
    if (metaAnimateBtn && metaSignal) {
        metaAnimateBtn.addEventListener('click', () => {
            metaAnimateBtn.disabled = true;
            
            // Animate the metastable signal
            metaSignal.style.transition = 'all 0.1s ease';
            metaSignal.style.stroke = '#ff0000';
            
            // Create oscillation effect
            let oscillations = 0;
            const maxOscillations = 8;
            
            const oscillate = () => {
                if (oscillations >= maxOscillations) {
                    // Settle to final state
                    metaSignal.setAttribute('points', '0,40 50,40 70,40 90,40 110,40 150,40 200,40');
                    metaSignal.style.stroke = '#ff6b6b';
                    metaAnimateBtn.disabled = false;
                    return;
                }
                
                const y1 = oscillations % 2 === 0 ? 10 : 70;
                const y2 = oscillations % 2 === 0 ? 70 : 10;
                
                metaSignal.setAttribute('points', `0,40 50,40 70,${y1} 90,${y2} 110,${y1} 150,40 200,40`);
                oscillations++;
                
                setTimeout(oscillate, 100);
            };
            
            oscillate();
        });
    }
}

// ==================== APPLICATIONS ====================
function initApplications() {
    initCounter();
    initShiftRegister();
    initRegister();
}

// Counter Application
function initCounter() {
    let counterValue = 0;
    const q0Led = document.getElementById('counter-q0');
    const q1Led = document.getElementById('counter-q1');
    const q2Led = document.getElementById('counter-q2');
    const counterValueEl = document.getElementById('counter-value');
    const countBtn = document.getElementById('counter-btn');
    const resetBtn = document.getElementById('counter-reset');
    
    function updateCounterDisplay() {
        const b2 = (counterValue >> 2) & 1;
        const b1 = (counterValue >> 1) & 1;
        const b0 = counterValue & 1;
        
        updateLED(q0Led, b0);
        updateLED(q1Led, b1);
        updateLED(q2Led, b2);
        
        counterValueEl.textContent = `${b2}${b1}${b0}`;
    }
    
    function updateLED(led, value) {
        if (value === 1) {
            led.classList.add('on');
            led.textContent = '1';
        } else {
            led.classList.remove('on');
            led.textContent = '0';
        }
    }
    
    countBtn.addEventListener('click', () => {
        counterValue = (counterValue + 1) % 8;
        updateCounterDisplay();
        
        // Animate button
        countBtn.style.transform = 'scale(0.95)';
        setTimeout(() => countBtn.style.transform = '', 100);
    });
    
    resetBtn.addEventListener('click', () => {
        counterValue = 0;
        updateCounterDisplay();
    });
    
    // Initial display
    updateCounterDisplay();
}

// Shift Register Application
function initShiftRegister() {
    let shiftData = [0, 0, 0, 0]; // Q3, Q2, Q1, Q0
    let inputValue = 0;
    
    const inputButtons = document.querySelectorAll('.shift-bit-btn');
    const shiftBtn = document.getElementById('shift-btn');
    const clearBtn = document.getElementById('shift-reset');
    
    const q0Led = document.getElementById('shift-q0');
    const q1Led = document.getElementById('shift-q1');
    const q2Led = document.getElementById('shift-q2');
    const q3Led = document.getElementById('shift-q3');
    
    function updateShiftDisplay() {
        updateLED(q0Led, shiftData[0]);
        updateLED(q1Led, shiftData[1]);
        updateLED(q2Led, shiftData[2]);
        updateLED(q3Led, shiftData[3]);
    }
    
    function updateLED(led, value) {
        if (value === 1) {
            led.classList.add('on');
            led.textContent = '1';
        } else {
            led.classList.remove('on');
            led.textContent = '0';
        }
    }
    
    // Input buttons
    inputButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            inputButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            inputValue = parseInt(btn.dataset.shiftInput);
        });
    });
    
    // Shift button
    shiftBtn.addEventListener('click', () => {
        // Shift left: new bit enters from right
        shiftData.unshift(inputValue);
        shiftData.pop();
        
        updateShiftDisplay();
        
        // Animate
        shiftBtn.style.transform = 'scale(0.95)';
        setTimeout(() => shiftBtn.style.transform = '', 100);
    });
    
    // Clear button
    clearBtn.addEventListener('click', () => {
        shiftData = [0, 0, 0, 0];
        updateShiftDisplay();
    });
    
    // Set initial
    inputButtons[0].classList.add('active');
    updateShiftDisplay();
}

// Register Application
function initRegister() {
    let registerData = [0, 0, 0, 0]; // D3, D2, D1, D0 -> Q3, Q2, Q1, Q0
    let inputValues = [0, 0, 0, 0];
    
    const regInputButtons = document.querySelectorAll('.reg-bit-btn');
    const loadBtn = document.getElementById('register-btn');
    
    const q0Led = document.getElementById('reg-q0');
    const q1Led = document.getElementById('reg-q1');
    const q2Led = document.getElementById('reg-q2');
    const q3Led = document.getElementById('reg-q3');
    
    function updateRegisterDisplay() {
        updateLED(q0Led, registerData[0]);
        updateLED(q1Led, registerData[1]);
        updateLED(q2Led, registerData[2]);
        updateLED(q3Led, registerData[3]);
    }
    
    function updateLED(led, value) {
        if (value === 1) {
            led.classList.add('on');
            led.textContent = '1';
        } else {
            led.classList.remove('on');
            led.textContent = '0';
        }
    }
    
    // Input buttons
    regInputButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const inputIndex = parseInt(btn.dataset.regInput);
            const value = parseInt(btn.dataset.value);
            
            // Update button states for this input
            document.querySelectorAll(`.reg-bit-btn[data-reg-input="${inputIndex}"]`).forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            
            // Update data
            inputValues[inputIndex] = value;
        });
    });
    
    // Load button
    loadBtn.addEventListener('click', () => {
        // Load parallel inputs to register
        registerData = [...inputValues];
        updateRegisterDisplay();
        
        // Animate
        loadBtn.style.transform = 'scale(0.95)';
        setTimeout(() => loadBtn.style.transform = '', 100);
    });
    
    // Initial display
    updateRegisterDisplay();
}

// ==================== UTILITY FUNCTIONS ====================
// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPosition = `center ${scrolled * 0.5}px`;
});

// Add intersection observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.concept-card, .truth-table tbody tr, .circuit-diagram').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease-out';
    observer.observe(el);
});
