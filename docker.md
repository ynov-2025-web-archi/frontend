// créer une image dans docker 
## docker build -t [image] .
// lancer l'image en mode interactif dans le shell/terminal
## docker run [image]
// lancer l'image en mode détaché (en background) / sans shell 
## docker run -d [image]
// lancer ine image avec le mapping de port 
## docker run -p 3000:3000 [image]
// Lister les containrs en cours d'éxécution 
## docker ps