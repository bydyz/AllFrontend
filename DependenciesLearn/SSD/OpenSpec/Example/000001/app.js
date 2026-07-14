class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.currentPriority = 'all';
        this.initElements();
        this.bindEvents();
        this.render();
        this.initTheme();
    }

    loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        return todos.map(todo => ({
            ...todo,
            priority: todo.priority || 'medium' // 默认优先级
        }));
    }

    initElements() {
        this.input = document.getElementById('todo-input');
        this.addBtn = document.getElementById('add-btn');
        this.list = document.getElementById('todo-list');
        this.pendingCount = document.getElementById('pending-count');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.themeToggle = document.getElementById('theme-toggle');
        this.prioritySelect = document.getElementById('priority-select');
        this.priorityBtns = document.querySelectorAll('.priority-btn');
    }

    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        this.priorityBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setPriority(e.target.dataset.priority);
            });
        });

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    initTheme() {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.classList.add('dark-mode');
            this.themeToggle.textContent = '☀️';
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        this.themeToggle.textContent = isDark ? '☀️' : '🌙';
    }

    addTodo() {
        const text = this.input.value.trim();
        const priority = this.prioritySelect.value;
        if (!text) return;

        const todo = {
            id: Date.now(),
            text,
            completed: false,
            priority
        };

        this.todos.push(todo);
        this.saveTodos();
        this.render();
        this.input.value = '';
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    setPriority(priority) {
        this.currentPriority = priority;
        this.priorityBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.priority === priority);
        });
        this.render();
    }

    getFilteredTodos() {
        let filtered = this.todos;
        
        // 按完成状态筛选
        if (this.currentFilter === 'pending') {
            filtered = filtered.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        }
        
        // 按优先级筛选
        if (this.currentPriority !== 'all') {
            filtered = filtered.filter(t => t.priority === this.currentPriority);
        }
        
        return filtered;
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        
        this.list.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="app.toggleTodo(${todo.id})">
                <span class="priority-dot"></span>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">×</button>
            </li>
        `).join('');

        const pendingCount = this.todos.filter(t => !t.completed).length;
        this.pendingCount.textContent = pendingCount;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

const app = new TodoApp();