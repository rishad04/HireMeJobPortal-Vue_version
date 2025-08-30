<template>
   <main class="container">
        <div class="form-container">
            <h2>Create an Account</h2>
            <form action="login.html">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
                <p class="form-switch">Already have an account? <a href="login.html">Login</a></p>
            </form>
        </div>
    </main>
</template>
