robert@workstation$ ssh root@electrocorp.com
root@www.electrocorp.com# iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to 172.22.1.5:80
root@www.electrocorp.com# iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to 172.22.1.5:443
root@www.electrocorp.com# logout
robert@workstation$ ssh root@admin.electrocorp.com
root@admin.electrocorp.com# iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to 172.22.3.5:80
root@admin.electrocorp.com# iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to 172.22.3.5:443
root@admin.electrocorp.com# logout
robert@workstation$ ssh api@admin.electrocorp.com
root@api.electrocorp.com# iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to 172.22.2.5:80
root@api.electrocorp.com# iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to 172.22.2.5:443
root@api.electrocorp.com# # Facciamo lo static routing per avere la comunicazione fra il leader API e il DBMS.
root@api.electrocorp.com# ssh root@172.22.2.5
root@leader-172.22.2.5% ip route add 172.22.4.0/24 ia 172.22.2.1
root@leader-172.22.2.5% logout
root@api.electrocorp.com# ssh root@172.22.4.5
root@dbms-leader-172.22.4.5% ip route add 172.22.2.0/24 ia 172.22.4.1
root@dbms-leader-172.22.4.5% logout
robert@workstation$ logout