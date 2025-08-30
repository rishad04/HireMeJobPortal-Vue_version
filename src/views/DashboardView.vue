<template>
   <main class="container-dashboard" style="margin: 20px;">
        <div class="row">
            <aside class="col-4 dashboard-sidebar">
                <div class="profile-card">
                    <img src="https://via.placeholder.com/80" alt="User Avatar" class="profile-avatar">
                    <h3 class="profile-name">Alex Doe</h3>
                    <p class="profile-email">alex.doe@example.com</p>
                </div>
                <nav class="dashboard-nav">
                    <ul>
                        <li><a href="dashboard.html" class="active">Applied Jobs</a></li>
                        <li><a href="profile.html">My Profile</a></li>
                        <li><a href="settings.html">Settings</a></li>
                        <li><a href="#">Help</a></li>
                    </ul>
                </nav>
            </aside>

            <section class="col-8 dashboard-main-content">
                <h2>Jobs You've Applied For</h2>
                <div class="job-listings">
                    <div class="job-card">
                        <div class="job-card-header">
                            <h3 class="job-title">Senior Frontend Developer</h3>
                            <span class="job-type full-time">Full Time</span>
                        </div>
                        <p class="company-name">Tech Solutions Inc.</p>
                        <p class="location">New York, NY</p>
                        <div class="job-card-footer">
                            <span class="status applied">Status: Applied</span>
                        </div>
                    </div>
                    <div class="job-card">
                         <div class="job-card-header">
                            <h3 class="job-title">UI/UX Designer</h3>
                            <span class="job-type remote">Remote</span>
                        </div>
                        <p class="company-name">Creative Minds Co.</p>
                        <p class="location">Remote</p>
                        <div class="job-card-footer">
                            <span class="status under-review">Status: Under Review</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>

</template>
