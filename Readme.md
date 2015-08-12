# Microservices UX:  *The Microservices User eXperience*

`***"Don't make me think!"*** - *Steve Krug*`

`***"Make me think ... about what matters!"*** - *The Microservices UX Team*`

Building, Deploying and Maintaining Polyglot Microservices is *hard*. This project makes it *simple* and *easy*.

By curating ***best-of-breed infrastructure*** and blending in a ***coherent deployment and strong programming model***, Microservices UX helps you quickly ***gain the benefits of Microservices without the hassle***.

## Your First Time with *Microservices UX*

It's never easy on your first time ... but we've done our best to make it as easy as possible to get up and running and using Microservices UX as quickly as possible. 

### Prerequisites

To get up and running with Microserives UX you'll need the following tools installed:

* https://git-scm.com[GIT]
* https://www.vagrantup.com[Vagrant]
* A Virtualisation Provider such as https://www.virtualbox.org:[VirtualBox] for Vagrant to use.



### Get the base platform running locally within a vagrant virtual machine

```
  mkdir muon-platform-demo
  cd muon-platform-demo
  vagrant box add muon-platform-demo https://dl.dropboxusercontent.com/u/8022259/muon-platform-demo.box
  vagrant init muon-platform-demo
  vagrant up
```
 
 
### Youre done! Time to Kick the tyres!

Navigate to the muon platform portal page to take a test drive around the platform's core services.

```
  http://localhost:8080/ 
```



### Now, do somethign useful! 

Next, lets get a demo mciroservices app deployed and running.

```
  git clone https://github.com/simplicityitself/microservice-ux
  cd microservice-ux/demoApp
```
  
  view Readme.adoc
  
  
### And there's more! Exploring under the hood...  

using the muon command to disover
  
```
  vagrant ssh
  root@vagrant-ubuntu-trusty-64: muon -d local discover
   [ { identifier: 'photon',
    resourceConnections: [ 'amqp://muon:microservices@muonhost' ],
    streamConnections: [ 'amqp://muon:microservices@muonhost' ],
    tags: [ 'photon', 'helios' ] },
   { identifier: 'cli',
    tags: [ [] ],
    resourceConnections: [ 'amqp://muon:microservices@172.28.128.3:5672' ],
    stream: [ 'amqp://muon:microservices@172.28.128.3:5672' ] } ]
```
    
    
### Photon Event Store

Check projection loaded in to photon:
    
```
 http://localhost:3000/projection-keys
```
