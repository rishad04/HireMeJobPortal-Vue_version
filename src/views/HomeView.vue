<template>
  <main>
        <section class="hero-section">
            <div class="container">
                <h1>Find Your Dream Job</h1>
                <p>Search from thousands of job openings from top companies.</p>
                <form class="search-form">
                    <input type="text" placeholder="Job title, keywords, or company">
                    <input type="text" placeholder="City or location">
                    <button type="submit" class="btn btn-primary">Search Jobs</button>
                </form>
            </div>
        </section>

        <section class="jobs-section container">
            <h2>Featured Jobs</h2>
            <div class="job-listings">
                <div class="job-card">
                    <div class="job-card-header">
                        <h3 class="job-title">Senior Frontend Developer</h3>
                        <span class="job-type full-time">Full Time</span>
                    </div>
                    <p class="company-name">Tech Solutions Inc.</p>
                    <p class="location">New York, NY</p>
                    <div class="job-card-footer">
                        <a href="#" class="btn btn-primary">Apply Now</a>
                    </div>
                </div>

                <div class="job-card">
                    <div class="job-card-header">
                        <h3 class="job-title">Backend Engineer (Node.js)</h3>
                         <span class="job-type part-time">Part Time</span>
                    </div>
                    <p class="company-name">Data Systems LLC</p>
                    <p class="location">San Francisco, CA</p>
                    <div class="job-card-footer">
                        <a href="#" class="btn btn-primary">Apply Now</a>
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
                        <a href="#" class="btn btn-primary">Apply Now</a>
                    </div>
                </div>

                 <div class="job-card">
                    <div class="job-card-header">
                        <h3 class="job-title">DevOps Engineer</h3>
                        <span class="job-type full-time">Full Time</span>
                    </div>
                    <p class="company-name">Cloud Innovators</p>
                    <p class="location">Austin, TX</p>
                     <div class="job-card-footer">
                        <a href="#" class="btn btn-primary">Apply Now</a>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
