var Navbar = '';

document.addEventListener('DOMContentLoaded', (e) => {



    if (USR_ID == '') {
        Navbar = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
            <img src="src/img/logo1.png" alt="Responsive image"
                class="img-fluid" width="70px">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <a class="nav-link" onclick="" href="#">Log in</a>
                </li>
            </ul>
        </div>
    </nav>`;
    } else {
        Navbar = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
            <img src="src/img/logo1.png" alt="Responsive image"
                class="img-fluid" width="70px">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <a class="nav-link" href="pages/create-post.html">Create article</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="modal" data-target="#exampleModal" href="#">My wallet</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" onclick="" href="#">Log out</a>
                </li>
            </ul>
        </div>
    </nav>`;
    }

    document.getElementById('navbar').innerHTML = Navbar;
});