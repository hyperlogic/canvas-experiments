require 'rack'

# serve up current directory
run Rack::Directory.new(".")

