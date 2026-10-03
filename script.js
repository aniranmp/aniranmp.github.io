/* =========================================================
   ANIRAN PORTFOLIO V2
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const navbar =
    document.querySelector(".navbar");

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );

const year =
    document.getElementById("year");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function updateNavbar() {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 30) {

        navbar.classList.add(
            "scrolled"
        );

    } else {

        navbar.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);


updateNavbar();


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMobileMenu() {

    if (!mobileMenu || !menuButton) {
        return;
    }

    mobileMenu.classList.remove(
        "open"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    const spans =
        menuButton.querySelectorAll(
            "span"
        );

    if (spans.length === 2) {

        spans[0].style.transform =
            "rotate(0deg) translateY(0)";

        spans[1].style.transform =
            "rotate(0deg) translateY(0)";

    }

}


function toggleMobileMenu() {

    if (!mobileMenu || !menuButton) {
        return;
    }

    const isOpen =
        mobileMenu.classList.toggle(
            "open"
        );

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    const spans =
        menuButton.querySelectorAll(
            "span"
        );

    if (spans.length === 2) {

        if (isOpen) {

            spans[0].style.transform =
                "translateY(4px) rotate(45deg)";

            spans[1].style.transform =
                "translateY(-4px) rotate(-45deg)";

        } else {

            spans[0].style.transform =
                "rotate(0deg)";

            spans[1].style.transform =
                "rotate(0deg)";

        }

    }

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        toggleMobileMenu
    );

}


if (mobileMenu) {

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id =
                    entry.target.id;

                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute(
                            "href"
                        ) === `#${id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },
        {
            rootMargin:
                "-30% 0px -55% 0px",

            threshold:
                0
        }
    );


sections.forEach(section => {

    sectionObserver.observe(
        section
    );

});


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold:
                0.1,

            rootMargin:
                "0px 0px -40px 0px"
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(
        element
    );

});


/* =========================================================
   MOUSE PARALLAX FOR HERO VISUAL
========================================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (
    heroVisual &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 5;

            const rotateX =
                ((y / rect.height) - 0.5) * -5;


            const shell =
                heroVisual.querySelector(
                    ".visual-shell"
                );


            if (shell) {

                shell.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const shell =
                heroVisual.querySelector(
                    ".visual-shell"
                );

            if (shell) {

                shell.style.transform =
                    "perspective(900px) rotateX(0) rotateY(0)";

            }

        }
    );

}


/* =========================================================
   ESC CLOSES MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !mobileMenu ||
            !menuButton
        ) {
            return;
        }


        const clickedInsideMenu =
            mobileMenu.contains(
                event.target
            );


        const clickedButton =
            menuButton.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   SMOOTH ANCHOR BEHAVIOR
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior:
                        "smooth",
                    block:
                        "start"
                });

            }
        );

    });
