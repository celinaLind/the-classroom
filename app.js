// Application State
const state = {
    uploadedFiles: [],
    selectedMethod: null,
    learningPlan: null,
    currentLessonIndex: 0,
    lessons: []
};

// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const uploadedFiles = document.getElementById('uploadedFiles');
const methodButtons = document.querySelectorAll('.method-btn');
const generatePlanBtn = document.getElementById('generatePlanBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const learningPlan = document.getElementById('learningPlan');
const teachingInterface = document.getElementById('teachingInterface');
const methodSection = document.getElementById('methodSection');
const startTeachingBtn = document.getElementById('startTeachingBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const planContent = document.getElementById('planContent');
const lessonContent = document.getElementById('lessonContent');
const lessonTitle = document.getElementById('lessonTitle');
const progressFill = document.getElementById('progressFill');

// Event Listeners
fileInput.addEventListener('change', handleFileUpload);
uploadArea.addEventListener('click', () => fileInput.click());
methodButtons.forEach(btn => {
    btn.addEventListener('click', () => selectLearningMethod(btn.dataset.method, btn));
});
generatePlanBtn.addEventListener('click', generateLearningPlan);
startTeachingBtn.addEventListener('click', startTeaching);
prevBtn.addEventListener('click', previousLesson);
nextBtn.addEventListener('click', nextLesson);
restartBtn.addEventListener('click', restartSession);

// File Upload Handler
function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            state.uploadedFiles.push({
                name: file.name,
                type: file.type,
                content: e.target.result,
                size: file.size
            });
            
            displayUploadedFiles();
            
            // Show method selection when files are uploaded
            if (state.uploadedFiles.length > 0) {
                methodSection.classList.remove('hidden');
            }
        };
        
        // Read file based on type
        if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
            reader.readAsText(file);
        } else if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file); // Default to text for other types
        }
    });
}

// Display Uploaded Files
function displayUploadedFiles() {
    uploadedFiles.innerHTML = state.uploadedFiles.map((file, index) => `
        <span class="file-tag">
            ${file.name}
            <span class="remove-file" onclick="removeFile(${index})">×</span>
        </span>
    `).join('');
}

// Remove File
function removeFile(index) {
    state.uploadedFiles.splice(index, 1);
    displayUploadedFiles();
    
    if (state.uploadedFiles.length === 0) {
        methodSection.classList.add('hidden');
    }
}

// Select Learning Method
function selectLearningMethod(method, button) {
    // Remove previous selection
    methodButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Add selection to clicked button
    button.classList.add('selected');
    state.selectedMethod = method;
    
    // Enable generate plan button
    generatePlanBtn.disabled = false;
}

// Generate Learning Plan
function generateLearningPlan() {
    // Extract content from uploaded files
    const allContent = state.uploadedFiles
        .filter(file => file.content && typeof file.content === 'string' && !file.type.startsWith('image/'))
        .map(file => file.content)
        .join('\n\n');
    
    // Parse content into topics
    const topics = extractTopics(allContent);
    
    // Create learning plan based on selected method
    state.learningPlan = createPlanForMethod(topics, state.selectedMethod);
    state.lessons = state.learningPlan.lessons;
    
    // Display learning plan
    displayLearningPlan();
    
    // Show learning plan on chalkboard
    welcomeScreen.classList.add('hidden');
    learningPlan.classList.remove('hidden');
}

// Extract Topics from Content
function extractTopics(content) {
    if (!content || content.trim().length === 0) {
        return ['Introduction to the Material', 'Key Concepts', 'Practice and Review'];
    }
    
    // Simple topic extraction based on headers, bullet points, and paragraphs
    const lines = content.split('\n').filter(line => line.trim());
    const topics = [];
    
    // Look for headers (lines with #, or all caps, or ending with :)
    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('#') || 
            trimmed === trimmed.toUpperCase() && trimmed.length > 5 && trimmed.length < 100 ||
            (trimmed.endsWith(':') && trimmed.length < 100)) {
            topics.push(trimmed.replace(/^#+\s*/, '').replace(/:$/, ''));
        }
    });
    
    // If no topics found, create generic ones based on content length
    if (topics.length === 0) {
        const words = content.split(/\s+/).length;
        const numTopics = Math.min(5, Math.max(3, Math.floor(words / 200)));
        
        for (let i = 0; i < numTopics; i++) {
            topics.push(`Section ${i + 1}`);
        }
    }
    
    return topics.slice(0, 8); // Limit to 8 topics
}

// Create Plan for Selected Method
function createPlanForMethod(topics, method) {
    const methodStrategies = {
        visual: {
            description: 'Visual learning with diagrams, mind maps, and visual organization',
            approach: 'We\'ll use visual representations and spatial organization to help you understand the material.',
            lessonStyle: 'visual'
        },
        auditory: {
            description: 'Auditory learning through reading aloud and discussion',
            approach: 'We\'ll present the material in a way that you can read aloud and discuss with yourself.',
            lessonStyle: 'auditory'
        },
        reading: {
            description: 'Reading and writing focused learning with detailed notes',
            approach: 'We\'ll present comprehensive written content that you can read and take notes on.',
            lessonStyle: 'reading'
        },
        kinesthetic: {
            description: 'Hands-on learning with interactive practice and exercises',
            approach: 'We\'ll include practice questions and interactive elements to help you learn by doing.',
            lessonStyle: 'kinesthetic'
        }
    };
    
    const strategy = methodStrategies[method] || methodStrategies.reading;
    
    // Create lessons from topics
    const lessons = topics.map((topic, index) => ({
        title: topic,
        content: generateLessonContent(topic, method, index, topics.length),
        index: index
    }));
    
    return {
        method: method,
        strategy: strategy,
        topics: topics,
        lessons: lessons
    };
}

// Generate Lesson Content
function generateLessonContent(topic, method, index, total) {
    const contentTemplates = {
        visual: `
            <h3>${topic}</h3>
            <div class="visual-lesson">
                <p><strong>📊 Key Visual Concepts:</strong></p>
                <ul>
                    <li>Visualize the main idea: ${topic}</li>
                    <li>Create a mental image of how this concept connects to others</li>
                    <li>Draw diagrams or mind maps to organize information</li>
                </ul>
                <p><strong>💡 Visual Memory Tip:</strong> Associate this topic with a specific color or symbol.</p>
                <p>Take a moment to sketch out your understanding of <em>${topic}</em> on paper.</p>
            </div>
        `,
        auditory: `
            <h3>${topic}</h3>
            <div class="auditory-lesson">
                <p><strong>🎧 Let's Discuss: ${topic}</strong></p>
                <p>Read the following aloud to help reinforce your understanding:</p>
                <blockquote>
                    "${topic} is an important concept to understand. Take time to explain it in your own words, 
                    as if you were teaching it to someone else. Speaking the material aloud helps create stronger 
                    neural connections and improves retention."
                </blockquote>
                <p><strong>📢 Practice:</strong> Explain this concept to yourself or record yourself teaching it.</p>
            </div>
        `,
        reading: `
            <h3>${topic}</h3>
            <div class="reading-lesson">
                <p><strong>📖 Reading Focus: ${topic}</strong></p>
                <p>This section covers the essential information about ${topic}. Take detailed notes as you read.</p>
                <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <p>Key points to remember:</p>
                    <ul>
                        <li>Main concept: ${topic}</li>
                        <li>Review your uploaded materials for specific details</li>
                        <li>Write down important definitions and examples</li>
                        <li>Summarize in your own words</li>
                    </ul>
                </div>
                <p><strong>✍️ Writing Exercise:</strong> Create a summary paragraph about this topic.</p>
            </div>
        `,
        kinesthetic: `
            <h3>${topic}</h3>
            <div class="kinesthetic-lesson">
                <p><strong>✋ Interactive Practice: ${topic}</strong></p>
                <p>Let's learn by doing! Complete these activities:</p>
                <ol>
                    <li><strong>Apply it:</strong> Think of a real-world example of ${topic}</li>
                    <li><strong>Practice:</strong> Create a practical scenario using this concept</li>
                    <li><strong>Test yourself:</strong> How would you use ${topic} in a real situation?</li>
                </ol>
                <div style="background: rgba(255, 215, 0, 0.2); padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <p><strong>🎯 Quick Exercise:</strong></p>
                    <p>Stand up, move around, and physically act out or demonstrate your understanding of this concept.</p>
                </div>
            </div>
        `
    };
    
    return contentTemplates[method] || contentTemplates.reading;
}

// Display Learning Plan
function displayLearningPlan() {
    const plan = state.learningPlan;
    
    planContent.innerHTML = `
        <div class="plan-overview">
            <h3>📋 Learning Method: ${plan.method.charAt(0).toUpperCase() + plan.method.slice(1)}</h3>
            <p><strong>Strategy:</strong> ${plan.strategy.description}</p>
            <p><em>${plan.strategy.approach}</em></p>
            
            <h4 style="margin-top: 20px; color: #ffd700;">Topics Covered:</h4>
            <ol style="margin-left: 20px; line-height: 2;">
                ${plan.topics.map(topic => `<li>${topic}</li>`).join('')}
            </ol>
            
            <p style="margin-top: 20px;">
                <strong>Total Lessons:</strong> ${plan.lessons.length}
            </p>
        </div>
    `;
}

// Start Teaching Session
function startTeaching() {
    learningPlan.classList.add('hidden');
    teachingInterface.classList.remove('hidden');
    state.currentLessonIndex = 0;
    displayLesson();
}

// Display Current Lesson
function displayLesson() {
    const lesson = state.lessons[state.currentLessonIndex];
    
    lessonTitle.textContent = `Lesson ${state.currentLessonIndex + 1} of ${state.lessons.length}`;
    lessonContent.innerHTML = lesson.content;
    
    // Update progress bar
    const progress = ((state.currentLessonIndex + 1) / state.lessons.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update button states
    prevBtn.disabled = state.currentLessonIndex === 0;
    nextBtn.textContent = state.currentLessonIndex === state.lessons.length - 1 ? 'Finish' : 'Next';
}

// Previous Lesson
function previousLesson() {
    if (state.currentLessonIndex > 0) {
        state.currentLessonIndex--;
        displayLesson();
    }
}

// Next Lesson
function nextLesson() {
    if (state.currentLessonIndex < state.lessons.length - 1) {
        state.currentLessonIndex++;
        displayLesson();
    } else {
        // Finished all lessons
        showCompletionMessage();
    }
}

// Show Completion Message
function showCompletionMessage() {
    lessonContent.innerHTML = `
        <div style="text-align: center; padding: 50px 20px;">
            <h2 style="color: #ffd700; font-size: 2.5em; margin-bottom: 20px;">🎉 Congratulations!</h2>
            <p style="font-size: 1.3em; margin-bottom: 30px;">
                You've completed all ${state.lessons.length} lessons!
            </p>
            <p style="font-size: 1.1em; margin-bottom: 20px;">
                You've successfully learned using the <strong>${state.selectedMethod}</strong> method.
            </p>
            <p style="font-size: 1em; opacity: 0.9;">
                Keep practicing and reviewing the material to reinforce your understanding.
            </p>
        </div>
    `;
}

// Restart Session
function restartSession() {
    // Reset state
    state.currentLessonIndex = 0;
    
    // Show welcome screen
    teachingInterface.classList.add('hidden');
    learningPlan.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    
    // Clear selections
    methodButtons.forEach(btn => btn.classList.remove('selected'));
    state.selectedMethod = null;
    generatePlanBtn.disabled = true;
}

// Initialize App
console.log('The Classroom app initialized');
