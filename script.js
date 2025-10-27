document.addEventListener('DOMContentLoaded', () => {
    // 1. Chức năng Toggle Menu Responsive
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
        
        // Đóng menu khi click ra ngoài (tùy chọn)
        document.addEventListener('click', (event) => {
            const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
        });
    }

    // 2. Chức năng Counter-Up (Đếm số)
    const counters = document.querySelectorAll('.counter');
    let countersActivated = false;

    // Hàm thực hiện animation đếm số
    const runCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 giây
        let start = 0;
        let startTime;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const value = Math.floor(percentage * target);

            // Định dạng số có dấu phẩy nếu lớn (ví dụ: 50,000)
            counter.innerText = value.toLocaleString('en-US'); 

            if (percentage < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    // Intersection Observer: Theo dõi phần tử thống kê
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersActivated) {
                counters.forEach(runCounter);
                countersActivated = true;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Kích hoạt khi 50% phần tử hiển thị
    });

    const statsSection = document.querySelector('.stats-counter');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // 3. Testimonial Carousel
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let autoSlideInterval;

    const showTestimonial = (index) => {
        testimonialItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    };

    const nextTestimonial = () => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    };

    const prevTestimonial = () => {
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentIndex);
    };

    // Khởi tạo carousel
    if (testimonialItems.length > 0) {
        showTestimonial(currentIndex);
        
        // Tự động chuyển slide mỗi 5 giây
        autoSlideInterval = setInterval(nextTestimonial, 5000); 
    }

    // Xử lý sự kiện click cho nút Prev/Next
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval); // Dừng auto-slide khi người dùng tương tác
            prevTestimonial();
            autoSlideInterval = setInterval(nextTestimonial, 5000); // Khởi động lại auto-slide
        });

        nextBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval); // Dừng auto-slide khi người dùng tương tác
            nextTestimonial();
            autoSlideInterval = setInterval(nextTestimonial, 5000); // Khởi động lại auto-slide
        });
    }
}); 