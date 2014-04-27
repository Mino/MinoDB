# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

	config.vm.provider :virtualbox do |v|
		v.customize ["modifyvm", :id, "--memory", 256]
	end

	config.vm.box = "minodb"

	config.vm.define :minodb1 do |server_config|
		server_config.vm.network :private_network, ip: "172.16.0.10"
		server_config.vm.hostname = "minodb1.local"
		server_config.vm.provision :chef_solo do |chef|
			chef.cookbooks_path = "../cookbooks/"
			chef.json = {
				"mino" => {
					"environment" => "dev"
				}
			}
			chef.add_recipe "hosts"
			chef.add_role("minodb")
			chef.add_recipe "add_auth_keys"
		end
	end

end