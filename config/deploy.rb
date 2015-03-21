lock '3.2.1'

set :application, 'resume'
set :repo_url, 'git@bitbucket.org:saulosantiago/resum.git'
set :branch, 'master'

set :deploy_to, '/home/resume/www/'
set :scm, :git

set :format, :pretty
set :log_level, :debug
set :pty, true
set :keep_releases, 5

set :nvm_path, '/home/resume/.nvm'
set :nvm_node, 'v0.10.31'

namespace :deploy do
  desc 'Restart application'
  task :lineman_build do
    on roles(:app), in: :sequence, wait: 5 do
      execute <<-CMD
        cd #{ release_path } && NODE_VERSION=v0.10.31 ~/.nvm/bin/nvm-exec.sh lineman build
      CMD
    end
  end

  after :publishing, :lineman_build
end
