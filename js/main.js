document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    if (themeToggle) {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme') || 'dark';
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // Modal Logic
    const projectData = {
        'attendease': {
            title: 'AttendEase',
            image: 'foto-pso.png',
            problem: 'Mengimplementasikan dan menguji alur CI/CD (Continuous Integration / Continuous Deployment) pada codebase proyek manajemen HR yang sudah ada.',
            process: 'Merancang workflow CI/CD terotomasi via GitHub Actions dan menyusun skenario automated testing. Melakukan setup basis data dan menambahkan beberapa fitur penunjang (RBAC Finance, Tema UI, dan Kalender) untuk memvalidasi pipeline berjalan dengan baik.',
            impact: 'Pipeline berhasil ter-deploy ke Google Cloud Run (GCP) dengan proteksi regression testing, memastikan penambahan fitur baru tidak merusak stabilitas sistem.'
        },
        'laundryin': {
            title: 'LaundryIn',
            image: 'foto-laundryin.png',
            problem: 'Ketiadaan platform terpusat yang menghubungkan pelanggan dan penyedia jasa laundry, membuat manajemen pesanan tidak terstruktur.',
            process: 'Bertanggung jawab penuh pada eksekusi teknis perangkat lunak. Menerjemahkan desain purwarupa UI/UX yang sudah dibuat oleh tim ke dalam kode front-end menggunakan Flutter (Dart) dan mengintegrasikan logika back-end via Supabase.',
            impact: 'Terciptanya aplikasi mobile fungsional yang mampu mengelola pesanan digital, manajemen akun pengguna, dan kalkulasi transaksi secara otomatis.'
        },
        'jastip': {
            title: 'Jastip Asrama ITS',
            image: 'foto-jastip.png',
            problem: 'Mendigitalisasi layanan Jasa Titip (Jastip) mahasiswa asrama yang sebelumnya masih berjalan secara manual agar lebih efisien dan terstruktur.',
            process: 'Mengaplikasikan kerangka kerja Design Thinking dengan melakukan riset pengguna, merumuskan Empathy Map, dan mendefinisikan How-Might-We (HMW). Menyerahkan hasil riset pengguna sebagai acuan dasar bagi desainer UI/UX untuk pembuatan prototipe di Figma.',
            impact: 'Menghasilkan landasan riset produk yang solid dan tervalidasi yang berhasil diterjemahkan menjadi desain antarmuka aplikasi.'
        },
        'compvis': {
            title: 'Simulasi Absensi Computer Vision',
            image: 'foto-compvis.png',
            problem: 'Mengeksplorasi alternatif sistem presensi otomatis touchless berbasis AI untuk efisiensi logging kehadiran.',
            process: 'Menggunakan Python dan OpenCV untuk merancang model Face Detection (Haar Cascade), Hand Skeleton Detection (MediaPipe), serta Face Recognition (LBPH).',
            impact: 'Sistem berhasil mendeteksi identitas pengguna secara real-time dan mencatat waktu kehadiran langsung ke log sistem.'
        },
        'telkom': {
            title: 'Dashboard KPI PT Telkom Indonesia',
            image: 'foto-meoti.png',
            problem: 'Kebutuhan sistem pendukung keputusan (DSS) untuk memonitor performa keuangan perusahaan berbasis Balanced Scorecard (BSC).',
            process: 'Melakukan data cleansing, kemudian merancang Executive Dashboard interaktif menggunakan Microsoft Power BI.',
            impact: 'Memvisualisasikan area kritis efisiensi biaya secara terpusat, mempermudah manajemen level eksekutif dalam mengambil keputusan strategis.'
        }
    };

    const modalOverlay = document.getElementById('portfolio-modal');
    if (modalOverlay) {
        const modalClose = document.getElementById('modal-close');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalProblem = document.getElementById('modal-problem');
        const modalProcess = document.getElementById('modal-process');
        const modalImpact = document.getElementById('modal-impact');

        const cards = document.querySelectorAll('.portfolio-card');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                if (projectId && projectData[projectId]) {
                    const data = projectData[projectId];
                    modalTitle.textContent = data.title;
                    modalImage.src = data.image;
                    modalProblem.textContent = data.problem;
                    modalProcess.textContent = data.process;
                    modalImpact.textContent = data.impact;
                    
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Scroll Reveal using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }
});
