$(document).ready(function () {
    $('#searchUser').on('keyup', function (e) {
        let username = e.target.value;

        //first request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '615cf10b6063080364a3',
                client_secret: '3456f31b122414e53e5f810da4c9da3e04c1b405'
            }
        }).done(function (user) {
            // console.log(user);
            //second request(for the recent repos)
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '615cf10b6063080364a3',
                    client_secret: '3456f31b122414e53e5f810da4c9da3e04c1b405',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function (repos) {
                // console.log(repos);
                //create content for div with id repos
                $.each(repos, function (index, repo) {
                    //not using html() because will override for every element
                    $('#repos').append(`
                        <div class="card card-body bg-light">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            //create content for div with id profile
            $('#profile').html(`
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">${user.name}</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="img-thumbnail avatar" src="${user.avatar_url}">
                                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
                                <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                                <span class="badge badge-success">Followers: ${user.followers}</span>
                                <span class="badge badge-info">Following: ${user.following}</span>
                                <br><br>
                                <ul class="list-group">
                                    <li class="list-group-item">Company: ${user.company}</li>
                                    <li class="list-group-item">Website/blog: ${user.blog}</li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        });
    });
});