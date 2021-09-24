
### Archived

I do not use cloudflare DNS for my site anymore, so this repository is now archived. It should still work for the foreseeable future however.

# Cloudflare Workers DNS Failover
Uses cloudflare workers and optionally HetrixTools to change DNS records to a different IP address when the main server goes down. 

Additionally, it can change the www. subdomain records too, and if you do not use a status monitor able to make a web request, it can be executed by worker cronjobs.
