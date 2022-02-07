import { ROLES } from '../constants';

export default function getGameOverContent(winningPlayer, gameState) {
  if (winningPlayer.role === ROLES.MP) {
    if (gameState.isSinglePlayer) {
      return `
                <p>Sorry, you lose. Boris J. has won the game!</p>
                <br/>
                <p>Are you surprised that Boris is sipping on wine and munching on cheese at a christmas party while you never even made it to see your Grandma in the hospital?</p>
                <p>...Or should you have predicted that its <i>one rule for them, and another for everyone else?</i></p>
                
    
                <br/>
                <br/>
    
                <p>Don't forget next election: You say Tory, they say Party</p>
            `;
    }

    return `
                <p>${winningPlayer.name} the MP has won the game!</p>
                <br/>
                <p>Are you surprised that an MP is sipping on wine and munching on cheese at a christmas party while the commoner never even made it to see their Grandma in the hospital?</p>
                <p>...Or should you have predicted that its <i>one rule for them, and another for everyone else?</i></p>
                
    
                <br/>
                <br/>
    
                <p>Don't forget next election: You say Tory, they say Party</p>
            `;
  }

  if (gameState.isSinglePlayer) {
    return `
            <p>Congrats, you win!</p>
            <br/>
            <p>But are you surprised how close Boris was to sipping on wine and munching on cheese at a christmas party before you made it to see your Grandma in the hospital?</p>
            <p>...Or should you have predicted that its <i>one rule for them, and another for everyone else?</i></p>
            

            <br/>
            <br/>

            <p>Don't forget next election: You say Tory, they say Party</p>
        `;
  }

  return `
        <p>The Commoner has won the game!</p>
        <br/>
        <p>But are you surprised how close the MPs were to sipping on wine and munching on cheese at a christmas party before they made it to see their Grandma in the hospital?</p>
        <p>...Or should you have predicted that its <i>one rule for them, and another for everyone else?</i></p>
        

        <br/>
        <br/>

        <p>Don't forget next election: You say Tory, they say Party</p>
    `;
}
