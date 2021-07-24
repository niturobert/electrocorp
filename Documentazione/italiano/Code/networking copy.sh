robert@workstation$ ssh root@electrocorp.com
root@www.electrocorp.com# # Configuring the firewall on the router that manages electrocorp.com
root@www.electrocorp.com# # 172.22.1.5 is the K8S cluster manager.
root@www.electrocorp.com# iptables -A FORWARD -p tcp --dport 80 -j DNAT --to 172.22.1.5:80
root@www.electrocorp.com# iptables -A FORWARD -p tcp --dport 443 -j DNAT --to 172.22.1.5:443
root@www.electrocorp.com# # Setting the default rule to DROP. This will disconnect us from the network and prevent editing firewall configuration from remote hosts.
root@www.electrocorp.com# iptables -P INPUT DROP
root@www.electrocorp.com# logout
robert@workstation$ ssh root@admin.electrocorp.com
root@admin.electrocorp.com# # Configuring the firewall on the router that manages admin.electrocorp.com and prevent editing firewall configuration from remote hosts.
root@admin.electrocorp.com# # 172.22.3.5 is the K8S cluster manager.
root@admin.electrocorp.com# iptables -A FORWARD -p tcp --dport 80 -j DNAT --to 172.22.3.5:80
root@admin.electrocorp.com# iptables -A FORWARD -p tcp --dport 443 -j DNAT --to 172.22.3.5:443
root@admin.electrocorp.com# # Setting the default rule to DROP. This will disconnect us from the network and prevent editing firewall configuration from remote hosts.
root@admin.electrocorp.com# iptables -P FORWARD DROP
root@admin.electrocorp.com# logout
robert@workstation$ ssh root@database.electrocorp.com
root@database.electrocorp.com# # Configuring the firewall on the router that manages the database cluster.
root@database.electrocorp.com# # Setting the default rule to DROP. This will disconnect us from the network and prevent editing firewall configuration from remote hosts.
root@database.electrocorp.com# iptables -A FORWARD --src 172.22.0.0/16 -p tcp --dport 5432 -j DNAT --to 172.22.4.5:5432
root@database.electrocorp.com# # Setting the default rule to DROP. This will disconnect us from the network and prevent editing firewall configuration from remote hosts.
root@database.electrocorp.com# iptables -P INPUT DROP
root@database.electrocorp.com# logout
robert@workstation$ ssh root@api.electrocorp.com
root@api.electrocorp.com# # Configuring the firewall on the router that manages api.electrocorp.com
root@api.electrocorp.com# # 172.22.1.5 is the K8S cluster manager.
root@api.electrocorp.com# iptables -A FORWARD -p tcp --dport 80 -j DNAT --to 172.22.2.5:80
root@api.electrocorp.com# iptables -A FORWARD -p tcp --dport 443 -j DNAT --to 172.22.2.5:443
root@api.electrocorp.com# # Setting the default rule to DROP. This will disconnect us from the network and prevent editing firewall configuration from remote hosts.
root@api.electrocorp.com# iptables -P INPUT DROP
root@api.electrocorp.com# logout