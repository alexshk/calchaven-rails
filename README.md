# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# Development setup
```
rbenv install
gem install bundler
bundle install
yarn install
# Optional: To fix "unmet peer dependency" warnings
yarn upgrade
```


# Server setup

Started from DigitalOcean ubuntu 18.04 caddy image. Based on guide at https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-18-04
```
## Install Node 14
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
bash nodesource_setup.sh
apt-get install -y nodejs

## You may also need development tools to build native addons
sudo apt-get install gcc g++ make libsqlite3-dev

## To install the Yarn package manager, run:
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

## Next, install the dependencies required to install Ruby:

sudo apt install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm5 libgdbm-dev

## SWITCH TO YOUR APP USER NOW
su - calchaven

## Clone the rbenv repository from GitHub into the directory ~/.rbenv:
git clone https://github.com/rbenv/rbenv.git ~/.rbenv

echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc

source ~/.bashrc

## is it working?
type rbenv

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

## Clone this app to ~/app
git clone https://github.com/brassrabbit/calchaven-rails.git ~/app

cd ~/app
rbenv install

echo "gem: --no-document" > ~/.gemrc

gem install bundler
bundle install

# Install frozen to use exactly the same versions as dev
yarn install --frozen-lockfile 

```

