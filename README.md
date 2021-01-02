# Cloudflare Workers DNS Failover
Uses cloudflare workers and optionally HetrixTools to change DNS records to a different IP address when the main server goes down. 

Additionally, it can change the www. subdomain records too, and if you do not use a status monitor able to make a web request, it can be executed by worker cronjobs.
