
        // les status du jeu on enregistre dans un objet pour qu on modifie facilement les valeurs
        let state = {
            joueur : "you",
            randomCase : 0,
            playerScore : 0,
            cpuScore : 0,
            nbMatch : 0,
            nbMatchNull : 0,
            choiceU : "X",
            choiceOrdi : "O",
            nbwin : 0,
            nbdef : 0,
            // on va faire completer le case aleatoirement par le robot
            aleatoire : function (){
                let randP = Math.round((Math.random()*10) - 2);

                if(randP < 0) randP = 0;

                if(state.joueur == "cpu")
                {
                    if(items[randP].textContent != "") return state.aleatoire();
                    items[randP].textContent = state.choiceOrdi;
                    state.joueur = 'you';
                    player.style.borderBottom = "4px solid #4286f4";
                    cpu.style.borderBottom = "none";
                    let listId = getIdContent(items);
                    resultCheck(listId,items[randP].getAttribute("id"),items);
                }
            }
        };

        // Récuperation des Choix
        let userChoice1 = document.querySelector(".choose1");
        let userChoice2 = document.querySelector(".choose2");

        userChoice1.addEventListener("click",()=>{
            state.choiceU = userChoice1.textContent;
            state.choiceOrdi = userChoice2.textContent;
            document.querySelector(".layer").style.display = "none";
            document.querySelector(".leaderBoard").style.display = "block";
            items.forEach((elem)=>{
                elem.removeAttribute("disabled");
            })

        });
        userChoice2.addEventListener("click",()=>{
            state.choiceU = userChoice2.textContent;
            state.choiceOrdi = userChoice1.textContent;
            document.querySelector(".leaderBoard").style.display = "block";
            document.querySelector(".layer").style.display = "none";
            items.forEach((elem)=>{
                elem.removeAttribute("disabled");
            })

        });


        // pour mettre dynamique le tour de rôle
        let player = document.querySelector(".player-turn");
        let cpu = document.querySelector(".cpu-turn");

        // les scores de player et le cpu
        let cpuScore = document.querySelector(".cpu-score");
        let playerScore = document.querySelector(".you-score");


        // Récupération des cases à clicker
        const items = [...document.getElementsByClassName('grid-item')];
            items.forEach((elem)=>{
                elem.setAttribute("disabled","");
            })

        // nombre de match fait et null
        let nombreMatch = document.getElementById("nbMatch");
        let nombreMatchNull = document.getElementById("nbMatchNull");

        // le boutton qui permet de continuer le jeu
        let continuer = document.querySelector("#continue");
        let continuer2 = document.querySelector("#continue2");
        continuer.addEventListener("click",()=>{
            rest();
            items.forEach((elem)=>{
                elem.removeAttribute("disabled");
            });
            document.querySelector(".layer2").style.display="none";
            state.aleatoire();
            
        });
        continuer2.addEventListener("click",()=>{
            rest();
            items.forEach((elem)=>{
                elem.removeAttribute("disabled");
            });
            document.querySelector(".layer3").style.display="none";
            state.aleatoire();
            
        });

        // Récuperation du contenu de chaque case
        function getIdContent(idGroup){
            let id = [];
            idGroup.forEach(element => {
                id.push(element.textContent);
            });
            
            return id;

        }

        // fonction de verification de la victoire  
        function isWin(items){
            let listId = getId(items);
            return listId;

        }


        function choiseCase(id) {
            let idSelect = document.getElementById(id);
            // on arrete la fonction quand la case est déjà rempli
            if(idSelect.textContent != "") return;

            // c est le tour de player
            
            if(state.joueur == "you")
            {
                idSelect.textContent = state.choiceU;
                state.joueur = "cpu";
                cpu.style.borderBottom = "4px solid #4286f4";
                player.style.borderBottom = "none";
                let listId = getIdContent(items);
                let fin = resultCheck(listId,idSelect,items);
                if(fin == "mitohy")
                {
                    state.aleatoire();    
                }
                
            }
            else return;

        }
        // Définition de la fonction qui teste les victoires
        function resultCheck(list,selection,item)
        {
            if(
                (list[0]==list[1] && list[0]==list[2] && list[0]==state.choiceU) ||
                (list[0]==list[3] && list[0]==list[6] && list[0]==state.choiceU) ||
                (list[0]==list[4] && list[0]==list[8] && list[0]==state.choiceU) ||
                (list[1]==list[4] && list[1]==list[7] && list[1]==state.choiceU) ||
                (list[2]==list[5] && list[2]==list[8] && list[2]==state.choiceU) ||
                (list[2]==list[4] && list[2]==list[6] && list[2]==state.choiceU) ||
                (list[3]==list[4] && list[3]==list[5] && list[3]==state.choiceU) ||
                (list[6]==list[7] && list[6]==list[8] && list[6]==state.choiceU)
            )
            {
                selection.textContent = state.choiceU; 
                state.playerScore++;
                state.nbMatch++;
                state.nbwin++;
                nombreMatch.textContent = state.nbMatch;
                playerScore.textContent = state.playerScore;
                document.querySelector(".layer2 h1").textContent = "WIN";
                document.querySelector(".layer2").style.display = "block";
                document.querySelector("#nbWin").textContent = state.nbwin;
                item.forEach((elem)=>{
                    elem.setAttribute("disabled","");
                });
                return "tapitra";
            }else if(
                (list[0]==list[1] && list[0]==list[2] && list[0]==state.choiceOrdi) ||
                (list[0]==list[3] && list[0]==list[6] && list[0]==state.choiceOrdi) ||
                (list[0]==list[4] && list[0]==list[8] && list[0]==state.choiceOrdi) ||
                (list[1]==list[4] && list[1]==list[7] && list[1]==state.choiceOrdi) ||
                (list[2]==list[5] && list[2]==list[8] && list[2]==state.choiceOrdi) ||
                (list[2]==list[4] && list[2]==list[6] && list[2]==state.choiceOrdi) ||
                (list[3]==list[4] && list[3]==list[5] && list[3]==state.choiceOrdi) ||
                (list[6]==list[7] && list[6]==list[8] && list[6]==state.choiceOrdi)
            )
            {
                selection.textContent = state.choiceOrdi; 
                state.cpuScore++;
                state.nbMatch++;
                state.nbdef++;
                nombreMatch.textContent = state.nbMatch;
                cpuScore.textContent = state.cpuScore;
                document.querySelector(".layer2 h1").textContent = "DEFEAT";
                document.querySelector(".layer2").style.display = "block";
                document.querySelector("#nbDef").textContent = state.nbdef;
                item.forEach((elem)=>{
                    elem.setAttribute("disabled","");
                });
                return "tapitra";
            }
            else if(
                list[0] !="" && list[1]!="" && list[2]!="" && list[3]!="" && list[4]!="" && list[5]!="" && list[6]!="" && list[7]!="" && list[8]!=""
            )
            {
                document.querySelector(".layer3").style.display = "block";
                document.querySelector(".layer3 h1").textContent = "MATCH NULL";
                state.nbMatch++;
                nombreMatch.textContent = state.nbMatch;
                state.nbMatchNull++;
                nombreMatchNull.textContent = state.nbMatchNull;
                item.forEach((elem)=>{
                    elem.setAttribute("disabled","");
                });
                return "tapitra";
            }
            else return "mitohy";
        }


        // Vide le contenu de toute les cases
        function rest() {
            for (var i = 0; i < items.length; i++) {
                console.log(items[i]);
                items[i].textContent = ''
            }
        }


    