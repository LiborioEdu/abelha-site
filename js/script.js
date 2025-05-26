const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('header nav');
const pesqLink = document.querySelector('.btn-sci')

const activePage = () => {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    sections.forEach(section => {
        section.classList.remove('active');
    });
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');

            setTimeout(() =>{
                sections[idx].classList.add('active');
            }, 1100);
        }
    })
}) 

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() =>{
                sections[0].classList.add('active');
            }, 1100);
    }
})

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

pesqLink.addEventListener('click', () => {
    sections[0].classList.remove('active');
    sections[1].classList.add('active');
    navLinks[0].classList.remove('active')
    navLinks[1].classList.add('active')
} )



