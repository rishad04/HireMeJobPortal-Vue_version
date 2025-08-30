<template>
   <main class="container">
        <div class="form-container">
            <h2>Login to Your Account</h2>
            <form action="dashboard.html">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                <p class="form-switch">Don't have an account? <a href="register.html">Register</a></p>
            </form>
        </div>
    </main>
</template>
