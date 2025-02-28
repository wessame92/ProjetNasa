Dans le conteneur il y a un projet NASA : nasaprojet-2 , contenant plusieur API . 
Les APIs sont : 
  _L'Espace (Astronomy Picture of the Day API)
  _Infos de la Terre (Earth Polychromatic Imaging Camera API)
  _Objets Proches de la Terre (NeoWs API)
  _Exploration de Mars (Mars Rover Photos API)

1_Déploiement d'un projet avec GitHub et Docker : 

_ Creation d'un repository avec github 
_ Cloner le depot sur notre machine avec : git clone 

2_Télécharger le package.json via le terminal de commande : npmm init -y 

3_Création du dockerfile : 

_Cree un fichier "Dockerfile" dans votre projet et y injecter le code suivant : 

"FROM nginx:latest

COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]"

_Ensuite il faut construire sont image Docker , dans le terminal: "docker build -t projetnasa-2 ." (ne pas oublier le point a la fin de la commande !)

_ Puis lancer notre conteneur avecle terminal : docker run -d -p 8080:80 "app_name" et verifier que votre conteneur se lance correctement grace a DockerDesktop . 

4_Ensuite il ne reste plus qu'a push vos commit sur github avec : git push (terminal)  











