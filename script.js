// Plot Thickener Storyboard Interface
class StoryboardApp {
    constructor() {
        this.shots = [];
        this.currentShot = null;
        this.currentModel = 'lora';
        this.isGenerating = false;
        
        // AI Edit Modal state
        this.aiEditModal = {
            isOpen: false,
            currentTool: 'brush',
            currentColor: 'red',
            brushSize: 5,
            canvas: null,
            ctx: null,
            isDrawing: false,
            lastX: 0,
            lastY: 0,
            history: [],
            historyIndex: -1
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.renderShots();
        this.renderTimeline();
        this.updateModelUI();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Script panel toggle
        document.getElementById('toggleScript').addEventListener('click', () => {
            this.toggleScriptPanel();
        });

        document.getElementById('closeScript').addEventListener('click', () => {
            this.toggleScriptPanel();
        });

        // Model toggle
        document.getElementById('modelToggle').addEventListener('change', (e) => {
            this.currentModel = e.target.checked ? 'nano' : 'lora';
            this.updateModelUI();
        });

        // Generate shot button
        document.getElementById('generateShotBtn').addEventListener('click', () => {
            this.generateNewShot();
        });

        // Shot management
        document.getElementById('addShot').addEventListener('click', () => {
            this.addNewShot();
        });

        // Shot editor
        document.getElementById('closeEditor').addEventListener('click', () => {
            this.closeShotEditor();
        });

        // Generation controls
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateImage();
        });

        document.getElementById('improvePrompt').addEventListener('click', () => {
            this.improvePrompt();
        });

        // Parameter controls
        document.getElementById('loraScale').addEventListener('input', (e) => {
            document.getElementById('loraValue').textContent = e.target.value;
        });

        document.getElementById('styleStrength').addEventListener('input', (e) => {
            document.getElementById('styleValue').textContent = e.target.value;
        });


        // Quick actions
        document.getElementById('upscaleBtn').addEventListener('click', () => {
            this.upscaleImage();
        });

        document.getElementById('refineBtn').addEventListener('click', () => {
            this.refineImage();
        });

        document.getElementById('variationsBtn').addEventListener('click', () => {
            this.generateVariations();
        });

        // Timeline controls
        document.getElementById('zoomIn').addEventListener('click', () => {
            this.zoomTimeline(1.2);
        });

        document.getElementById('zoomOut').addEventListener('click', () => {
            this.zoomTimeline(0.8);
        });


        // Shot editor backdrop click
        document.querySelector('.shot-editor').addEventListener('click', (e) => {
            if (e.target.classList.contains('shot-editor')) {
                this.closeShotEditor();
            }
        });

        // AI Edit Modal
        document.getElementById('closeAiEditModal').addEventListener('click', () => {
            this.closeAiEditModal();
        });

        document.getElementById('cancelAiEdit').addEventListener('click', () => {
            this.closeAiEditModal();
        });

        document.getElementById('saveAiEdit').addEventListener('click', () => {
            this.saveAiEdit();
        });

        document.getElementById('applyAiEdit').addEventListener('click', () => {
            this.applyAiEdit();
        });

        document.getElementById('previewAiEdit').addEventListener('click', () => {
            this.previewAiEdit();
        });

        // AI Edit Modal backdrop click
        document.getElementById('aiEditModal').addEventListener('click', (e) => {
            if (e.target.id === 'aiEditModal') {
                this.closeAiEditModal();
            }
        });

        // Prompt tabs
        document.querySelectorAll('.prompt-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchPromptTab(e.target.dataset.tab);
            });
        });

        // Suggestion chips
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.applySuggestion(e.target.dataset.suggestion);
            });
        });

        // Color picker
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectDrawingColor(e.target.dataset.color);
            });
        });

        // Drawing tools
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectDrawingTool(e.target.dataset.tool);
            });
        });

        // Brush size
        document.getElementById('brushSize').addEventListener('input', (e) => {
            document.getElementById('brushSizeValue').textContent = e.target.value;
        });

        // AI Settings
        document.getElementById('creativityLevel').addEventListener('input', (e) => {
            document.getElementById('creativityValue').textContent = e.target.value;
        });

        document.getElementById('styleConsistency').addEventListener('input', (e) => {
            document.getElementById('styleValue').textContent = e.target.value;
        });

        // Canvas tools
        document.getElementById('undoBtn').addEventListener('click', () => {
            this.undoCanvasAction();
        });

        document.getElementById('redoBtn').addEventListener('click', () => {
            this.redoCanvasAction();
        });

        document.getElementById('clearCanvasBtn').addEventListener('click', () => {
            this.clearCanvas();
        });
    }

    loadSampleData() {
        // Sample shots
        this.shots = [
            {
                id: 1,
                number: 1,
                description: "Marshall's walking boot mid-step beside beat-up motorcycle, crutches leaning against wall",
                status: 'completed',
                thumbnail: null,
                prompt: "A walking boot with crutches next to an old, beat-up motorcycle in a garage setting",
                scene: "INT. SHAHBAZ GARAGE - DAY"
            },
            {
                id: 2,
                number: 2,
                description: "Cyrus bending over to inspect the motorcycle, Marshall watching cautiously",
                status: 'generating',
                thumbnail: null,
                prompt: "A man in his 30s bending over to inspect an old motorcycle while another man watches from a distance",
                scene: "INT. SHAHBAZ GARAGE - DAY"
            },
            {
                id: 3,
                number: 3,
                description: "Close-up of Cyrus examining the bike's engine",
                status: 'pending',
                thumbnail: null,
                prompt: "Close-up shot of hands examining a motorcycle engine, focused and detailed",
                scene: "INT. SHAHBAZ GARAGE - DAY"
            },
            {
                id: 4,
                number: 4,
                description: "Marshall's concerned expression as he watches Cyrus",
                status: 'pending',
                thumbnail: null,
                prompt: "A man with a concerned, cagey expression watching someone work on his motorcycle",
                scene: "INT. SHAHBAZ GARAGE - DAY"
            },
            {
                id: 5,
                number: 5,
                description: "Wide shot of the garage with both characters and the motorcycle",
                status: 'pending',
                thumbnail: null,
                prompt: "Wide establishing shot of a garage interior with two men and an old motorcycle",
                scene: "INT. SHAHBAZ GARAGE - DAY"
            }
        ];

    }

    switchTab(tabName) {
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Show/hide relevant sections
        const timelineContainer = document.getElementById('timelineContainer');
        if (tabName === 'timeline') {
            timelineContainer.style.display = 'flex';
        } else {
            timelineContainer.style.display = 'none';
        }
    }

    toggleScriptPanel() {
        const panel = document.querySelector('.left-panel');
        panel.classList.toggle('hidden');
    }

    updateModelUI() {
        const loraScaleRow = document.getElementById('loraScaleRow');
        
        if (this.currentModel === 'nano') {
            loraScaleRow.style.display = 'none';
        } else {
            loraScaleRow.style.display = 'flex';
        }
    }

    addNewShot() {
        const newShot = {
            id: Date.now(),
            number: this.shots.length + 1,
            description: "New shot description",
            status: 'pending',
            thumbnail: null,
            prompt: "",
            scene: document.getElementById('sceneSelect').value
        };

        this.shots.push(newShot);
        this.renderShots();
        this.renderTimeline();
    }

    generateNewShot() {
        const promptInput = document.getElementById('shotPromptInput');
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            alert('Please enter a shot description');
            return;
        }

        const generateBtn = document.getElementById('generateShotBtn');
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        generateBtn.disabled = true;

        // Create new shot
        const newShot = {
            id: Date.now(),
            number: this.shots.length + 1,
            description: prompt,
            status: 'generating',
            thumbnail: null,
            prompt: prompt,
            scene: document.getElementById('sceneSelect').value
        };

        this.shots.push(newShot);
        this.renderShots();
        this.renderTimeline();

        // Simulate generation process
        setTimeout(() => {
            newShot.status = 'completed';
            newShot.thumbnail = `https://picsum.photos/200/120?random=${newShot.id}`;
            this.renderShots();
            this.renderTimeline();
            
            // Reset button and clear prompt
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Shot';
            generateBtn.disabled = false;
            promptInput.value = '';
        }, 3000);
    }

    renderShots() {
        const container = document.getElementById('shotSequence');
        container.innerHTML = '';

        this.shots.forEach((shot, index) => {
            const shotElement = this.createShotCard(shot, index);
            container.appendChild(shotElement);
        });

        this.setupDragAndDrop();
    }

    createShotCard(shot, index) {
        const card = document.createElement('div');
        card.className = 'shot-card';
        card.draggable = true;
        card.dataset.shotId = shot.id;
        card.dataset.index = index;

        const statusClass = shot.status;
        const statusText = shot.status.charAt(0).toUpperCase() + shot.status.slice(1);

        card.innerHTML = `
            <div class="shot-header">
                <span class="shot-number">Shot #${shot.number}</span>
                <span class="shot-status ${statusClass}">${statusText}</span>
            </div>
            <div class="shot-thumbnail ${shot.thumbnail ? '' : 'placeholder'}">
                ${shot.thumbnail ? `<img src="${shot.thumbnail}" alt="Shot ${shot.number}">` : '<i class="fas fa-image"></i>'}
            </div>
            <div class="shot-description">${shot.description}</div>
            <div class="shot-actions">
                <button class="edit-shot-btn" data-shot-id="${shot.id}" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-shot-btn" data-shot-id="${shot.id}" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        return card;
    }

    setupDragAndDrop() {
        const shotCards = document.querySelectorAll('.shot-card');
        
        shotCards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', card.dataset.shotId);
                card.classList.add('dragging');
            });

            card.addEventListener('dragend', (e) => {
                card.classList.remove('dragging');
                document.querySelectorAll('.drop-indicator').forEach(indicator => {
                    indicator.classList.remove('active');
                });
            });

            card.addEventListener('dragover', (e) => {
                e.preventDefault();
                const rect = card.getBoundingClientRect();
                const midpoint = rect.top + rect.height / 2;
                
                if (e.clientY < midpoint) {
                    card.style.borderTop = '2px solid #8b5cf6';
                    card.style.borderBottom = 'none';
                } else {
                    card.style.borderBottom = '2px solid #8b5cf6';
                    card.style.borderTop = 'none';
                }
            });

            card.addEventListener('dragleave', (e) => {
                card.style.borderTop = '';
                card.style.borderBottom = '';
            });

            card.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData('text/plain');
                const targetId = card.dataset.shotId;
                
                if (draggedId !== targetId) {
                    this.reorderShots(draggedId, targetId, e.clientY < card.getBoundingClientRect().top + card.getBoundingClientRect().height / 2);
                }
                
                card.style.borderTop = '';
                card.style.borderBottom = '';
            });
        });

        // Add event listeners for shot action buttons
        document.querySelectorAll('.edit-shot-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const shotId = parseInt(btn.dataset.shotId);
                this.editShot(shotId);
            });
        });


        document.querySelectorAll('.delete-shot-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const shotId = parseInt(btn.dataset.shotId);
                this.deleteShot(shotId);
            });
        });
    }

    reorderShots(draggedId, targetId, insertBefore) {
        const draggedIndex = this.shots.findIndex(shot => shot.id == draggedId);
        const targetIndex = this.shots.findIndex(shot => shot.id == targetId);
        
        if (draggedIndex === -1 || targetIndex === -1) return;

        const draggedShot = this.shots.splice(draggedIndex, 1)[0];
        const newIndex = insertBefore ? targetIndex : targetIndex + 1;
        
        this.shots.splice(newIndex, 0, draggedShot);
        
        // Update shot numbers
        this.shots.forEach((shot, index) => {
            shot.number = index + 1;
        });

        this.renderShots();
        this.renderTimeline();
    }

    editShot(shotId) {
        console.log('editShot called with ID:', shotId);
        const shot = this.shots.find(s => s.id === shotId);
        console.log('Found shot:', shot);
        if (!shot) {
            console.error('Shot not found with ID:', shotId);
            return;
        }

        this.openAiEditModal(shotId);
    }

    openShotEditor() {
        const editor = document.querySelector('.shot-editor');
        const promptInput = document.getElementById('promptInput');
        
        if (this.currentShot) {
            promptInput.value = this.currentShot.prompt;
        }
        
        editor.classList.add('active');
    }

    closeShotEditor() {
        const editor = document.querySelector('.shot-editor');
        editor.classList.remove('active');
        this.currentShot = null;
    }

    generateShot(shotId) {
        const shot = this.shots.find(s => s.id === shotId);
        if (!shot) return;

        shot.status = 'generating';
        this.renderShots();

        // Simulate generation process
        setTimeout(() => {
            shot.status = 'completed';
            shot.thumbnail = `https://picsum.photos/200/120?random=${shotId}`;
            this.renderShots();
        }, 3000);
    }

    deleteShot(shotId) {
        if (confirm('Are you sure you want to delete this shot?')) {
            this.shots = this.shots.filter(s => s.id !== shotId);
            this.renderShots();
            this.renderTimeline();
        }
    }

    generateImage() {
        if (!this.currentShot) return;

        this.isGenerating = true;
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        generateBtn.disabled = true;

        const prompt = document.getElementById('promptInput').value;
        this.currentShot.prompt = prompt;
        this.currentShot.status = 'generating';

        // Simulate generation
        setTimeout(() => {
            this.currentShot.status = 'completed';
            this.currentShot.thumbnail = `https://picsum.photos/400/300?random=${this.currentShot.id}`;
            
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = `<img src="${this.currentShot.thumbnail}" alt="Generated image" style="width: 100%; height: 100%; object-fit: cover;">`;
            
            this.isGenerating = false;
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Image';
            generateBtn.disabled = false;
            
            this.renderShots();
        }, 4000);
    }

    improvePrompt() {
        const promptInput = document.getElementById('promptInput');
        const currentPrompt = promptInput.value;
        
        if (!currentPrompt.trim()) {
            alert('Please enter a prompt first');
            return;
        }

        // Simulate AI improvement
        const improvedPrompt = this.simulateAIImprovement(currentPrompt);
        promptInput.value = improvedPrompt;
    }

    simulateAIImprovement(prompt) {
        const improvements = [
            "cinematic lighting, professional photography",
            "high detail, 4K resolution",
            "dramatic composition, rule of thirds",
            "film noir aesthetic, moody atmosphere",
            "character-focused, emotional depth"
        ];
        
        const randomImprovement = improvements[Math.floor(Math.random() * improvements.length)];
        return `${prompt}, ${randomImprovement}`;
    }


    renderTimeline() {
        const container = document.getElementById('timelineShots');
        container.innerHTML = '';

        this.shots.forEach((shot, index) => {
            const timelineShot = document.createElement('div');
            timelineShot.className = 'timeline-shot';
            timelineShot.draggable = true;
            timelineShot.dataset.shotId = shot.id;
            timelineShot.dataset.index = index;
            timelineShot.style.left = `${index * 120}px`;
            timelineShot.style.width = '100px';
            timelineShot.textContent = `Shot ${shot.number}`;
            timelineShot.title = shot.description;
            
            timelineShot.addEventListener('click', () => {
                this.editShot(shot.id);
            });
            
            container.appendChild(timelineShot);
        });

        this.setupTimelineDragAndDrop();
    }

    setupTimelineDragAndDrop() {
        const timelineShots = document.querySelectorAll('.timeline-shot');
        
        timelineShots.forEach(shot => {
            shot.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', shot.dataset.shotId);
                shot.classList.add('dragging');
                shot.style.opacity = '0.5';
            });

            shot.addEventListener('dragend', (e) => {
                shot.classList.remove('dragging');
                shot.style.opacity = '1';
                // Remove all drop indicators
                document.querySelectorAll('.timeline-drop-indicator').forEach(indicator => {
                    indicator.remove();
                });
            });

            shot.addEventListener('dragover', (e) => {
                e.preventDefault();
                const rect = shot.getBoundingClientRect();
                const midpoint = rect.left + rect.width / 2;
                
                // Remove existing indicators
                document.querySelectorAll('.timeline-drop-indicator').forEach(indicator => {
                    indicator.remove();
                });
                
                // Add drop indicator
                const indicator = document.createElement('div');
                indicator.className = 'timeline-drop-indicator';
                indicator.style.position = 'absolute';
                indicator.style.top = '0';
                indicator.style.height = '100%';
                indicator.style.width = '2px';
                indicator.style.background = '#8b5cf6';
                indicator.style.zIndex = '10';
                
                if (e.clientX < midpoint) {
                    indicator.style.left = `${rect.left - shot.parentElement.getBoundingClientRect().left}px`;
                } else {
                    indicator.style.left = `${rect.right - shot.parentElement.getBoundingClientRect().left}px`;
                }
                
                shot.parentElement.appendChild(indicator);
            });

            shot.addEventListener('dragleave', (e) => {
                // Only remove indicator if we're leaving the shot entirely
                if (!shot.contains(e.relatedTarget)) {
                    document.querySelectorAll('.timeline-drop-indicator').forEach(indicator => {
                        indicator.remove();
                    });
                }
            });

            shot.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData('text/plain');
                const targetId = shot.dataset.shotId;
                
                if (draggedId !== targetId) {
                    const rect = shot.getBoundingClientRect();
                    const midpoint = rect.left + rect.width / 2;
                    const insertBefore = e.clientX < midpoint;
                    this.reorderShots(draggedId, targetId, insertBefore);
                }
                
                // Clean up indicators
                document.querySelectorAll('.timeline-drop-indicator').forEach(indicator => {
                    indicator.remove();
                });
            });
        });
    }

    zoomTimeline(factor) {
        const timelineShots = document.querySelectorAll('.timeline-shot');
        timelineShots.forEach(shot => {
            const currentWidth = parseInt(shot.style.width) || 100;
            const newWidth = Math.max(50, Math.min(200, currentWidth * factor));
            shot.style.width = `${newWidth}px`;
        });
    }

    upscaleImage() {
        if (!this.currentShot || !this.currentShot.thumbnail) {
            alert('No image to upscale');
            return;
        }

        // Simulate upscaling
        alert('Upscaling image... This may take a few minutes.');
    }

    refineImage() {
        if (!this.currentShot || !this.currentShot.thumbnail) {
            alert('No image to refine');
            return;
        }

        // Simulate refinement
        alert('Refining image with AI...');
    }

    generateVariations() {
        if (!this.currentShot || !this.currentShot.thumbnail) {
            alert('No image to create variations from');
            return;
        }

        // Simulate variation generation
        alert('Generating variations...');
    }

    // AI Edit Modal Methods
    openAiEditModal(shotId) {
        console.log('openAiEditModal called with ID:', shotId);
        const shot = this.shots.find(s => s.id === shotId);
        console.log('Found shot for modal:', shot);
        if (!shot) {
            console.error('Shot not found for modal with ID:', shotId);
            return;
        }

        this.currentShot = shot;
        this.aiEditModal.isOpen = true;
        
        const modal = document.getElementById('aiEditModal');
        console.log('Modal element:', modal);
        if (modal) {
            modal.classList.add('active');
            console.log('Modal opened successfully');
        } else {
            console.error('Modal element not found');
        }
        
        // Initialize canvas
        this.initCanvas();
        
        // Load shot image if available
        if (shot.thumbnail) {
            this.loadImageToCanvas(shot.thumbnail);
        }
    }

    closeAiEditModal() {
        this.aiEditModal.isOpen = false;
        document.getElementById('aiEditModal').classList.remove('active');
        this.currentShot = null;
    }

    initCanvas() {
        const canvas = document.getElementById('editCanvas');
        const ctx = canvas.getContext('2d');
        
        this.aiEditModal.canvas = canvas;
        this.aiEditModal.ctx = ctx;
        
        // Set up canvas event listeners
        canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        canvas.addEventListener('mousemove', (e) => this.draw(e));
        canvas.addEventListener('mouseup', () => this.stopDrawing());
        canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // Set initial drawing style
        this.updateDrawingStyle();
    }

    loadImageToCanvas(imageSrc) {
        const img = new Image();
        img.onload = () => {
            const canvas = this.aiEditModal.canvas;
            const ctx = this.aiEditModal.ctx;
            
            // Clear canvas and draw image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Save initial state
            this.saveCanvasState();
        };
        img.src = imageSrc;
    }

    startDrawing(e) {
        this.aiEditModal.isDrawing = true;
        const rect = this.aiEditModal.canvas.getBoundingClientRect();
        this.aiEditModal.lastX = e.clientX - rect.left;
        this.aiEditModal.lastY = e.clientY - rect.top;
    }

    draw(e) {
        if (!this.aiEditModal.isDrawing) return;
        
        const canvas = this.aiEditModal.canvas;
        const ctx = this.aiEditModal.ctx;
        const rect = canvas.getBoundingClientRect();
        
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(this.aiEditModal.lastX, this.aiEditModal.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        
        this.aiEditModal.lastX = currentX;
        this.aiEditModal.lastY = currentY;
    }

    stopDrawing() {
        if (this.aiEditModal.isDrawing) {
            this.aiEditModal.isDrawing = false;
            this.saveCanvasState();
        }
    }

    updateDrawingStyle() {
        const ctx = this.aiEditModal.ctx;
        const colorMap = {
            red: '#ef4444',
            green: '#10b981',
            blue: '#3b82f6'
        };
        
        ctx.strokeStyle = colorMap[this.aiEditModal.currentColor];
        ctx.lineWidth = this.aiEditModal.brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    selectDrawingTool(tool) {
        this.aiEditModal.currentTool = tool;
        
        // Update UI
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tool="${tool}"]`).classList.add('active');
        
        // Update cursor
        const canvas = this.aiEditModal.canvas;
        if (tool === 'eraser') {
            canvas.style.cursor = 'grab';
        } else {
            canvas.style.cursor = 'crosshair';
        }
    }

    selectDrawingColor(color) {
        this.aiEditModal.currentColor = color;
        
        // Update UI
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-color="${color}"]`).classList.add('active');
        
        this.updateDrawingStyle();
    }

    saveCanvasState() {
        const canvas = this.aiEditModal.canvas;
        const imageData = canvas.toDataURL();
        
        // Remove any future states if we're not at the end
        this.aiEditModal.history = this.aiEditModal.history.slice(0, this.aiEditModal.historyIndex + 1);
        
        // Add new state
        this.aiEditModal.history.push(imageData);
        this.aiEditModal.historyIndex++;
        
        // Limit history size
        if (this.aiEditModal.history.length > 20) {
            this.aiEditModal.history.shift();
            this.aiEditModal.historyIndex--;
        }
    }

    undoCanvasAction() {
        if (this.aiEditModal.historyIndex > 0) {
            this.aiEditModal.historyIndex--;
            this.restoreCanvasState();
        }
    }

    redoCanvasAction() {
        if (this.aiEditModal.historyIndex < this.aiEditModal.history.length - 1) {
            this.aiEditModal.historyIndex++;
            this.restoreCanvasState();
        }
    }

    restoreCanvasState() {
        const canvas = this.aiEditModal.canvas;
        const ctx = this.aiEditModal.ctx;
        const imageData = this.aiEditModal.history[this.aiEditModal.historyIndex];
        
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = imageData;
    }

    clearCanvas() {
        if (confirm('Are you sure you want to clear the canvas?')) {
            const canvas = this.aiEditModal.canvas;
            const ctx = this.aiEditModal.ctx;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.saveCanvasState();
        }
    }

    switchPromptTab(tabName) {
        // Update active tab
        document.querySelectorAll('.prompt-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Show/hide panels
        document.querySelectorAll('.prompt-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${tabName}PromptPanel`).classList.add('active');
    }

    applySuggestion(suggestion) {
        const promptInput = document.getElementById('aiPromptInput');
        const suggestions = {
            'improve lighting': 'Improve the lighting to be more dramatic and cinematic',
            'add details': 'Add more visual details and textures to enhance realism',
            'change mood': 'Change the mood to be more atmospheric and engaging',
            'fix composition': 'Improve the composition using rule of thirds and better framing',
            'enhance colors': 'Enhance the color palette for better visual impact'
        };
        
        const currentPrompt = promptInput.value;
        const newSuggestion = suggestions[suggestion];
        
        if (currentPrompt.trim()) {
            promptInput.value = `${currentPrompt}, ${newSuggestion}`;
        } else {
            promptInput.value = newSuggestion;
        }
    }

    applyAiEdit() {
        const prompt = document.getElementById('aiPromptInput').value;
        const creativity = document.getElementById('creativityLevel').value;
        const detailLevel = document.getElementById('detailLevel').value;
        const styleConsistency = document.getElementById('styleConsistency').value;
        
        if (!prompt.trim()) {
            alert('Please enter AI instructions');
            return;
        }
        
        // Simulate AI processing
        const applyBtn = document.getElementById('applyAiEdit');
        applyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        applyBtn.disabled = true;
        
        setTimeout(() => {
            // Simulate successful AI edit
            alert('AI edit applied successfully!');
            
            applyBtn.innerHTML = '<i class="fas fa-magic"></i> Apply AI Edit';
            applyBtn.disabled = false;
            
            // Update shot with new image
            if (this.currentShot) {
                this.currentShot.thumbnail = `https://picsum.photos/400/300?random=${this.currentShot.id}_ai`;
                this.renderShots();
            }
        }, 3000);
    }

    previewAiEdit() {
        const prompt = document.getElementById('aiPromptInput').value;
        
        if (!prompt.trim()) {
            alert('Please enter AI instructions first');
            return;
        }
        
        // Simulate preview generation
        alert('Generating preview... This may take a moment.');
    }

    saveAiEdit() {
        if (!this.currentShot) return;
        
        // Save the current canvas state as the new shot image
        const canvas = this.aiEditModal.canvas;
        const imageData = canvas.toDataURL();
        
        // Update shot
        this.currentShot.thumbnail = imageData;
        this.currentShot.prompt = document.getElementById('aiPromptInput').value;
        
        // Update UI
        this.renderShots();
        this.closeAiEditModal();
        
        alert('AI edit saved successfully!');
    }
}

// Initialize the app when the page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new StoryboardApp();
});
