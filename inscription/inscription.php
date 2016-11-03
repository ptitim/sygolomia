<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="style.css">

    <?php include("../importCommun.php");?>
  </head>
  <body>
    <div class="container">
      Inscription
      <?php if(isset($_GET['erreur']) && $_GET['erreur'] === true){
        echo "<p id='erreur'>Il y a une erreur lors de l'inscription, veilliez réésayer";
      }?>
    <form method="post" action="ajoutUtilisateur.php">
      <fieldset class="form-group">
          <label for="pseudoInput">Pseudonyme</label>
          <input type="text" class="form-control" placeholder="4 caractere minimum" name="pseudo" id="pseudoInput" pattern=".{4,}">
      </fieldset>
      <fieldset class="form-group">
        <label for="emailInput">Email address : </label>
        <input type="email" class="form-control" id="emailInput" placeholder="Email" name="email">
      </fieldset>
      <fieldset class="form-group">
        <label for="passwordInput">Password : </label>
        <input type="password" class="form-control" id="passwordInput" placeholder="Password" name="password1"pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{6,}$" >
      </fieldset>
      <fieldset class="form-group">
        <label for="passwordInput2">Password again : </label>
        <input type="password"id="passwordInput2" class="form-control" placeholder="Repeat" name="password2">
      </fieldset>
      <span id="wrong">les mot de passe doivent etre identique</span>
      <br/>
      <button type="submit" id="submit" disabled="">Submit</button>
      <a href="../index.php" id="retour">Retour connexion</a>
    </form>
    <span>le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffre et un caractere special.</span>
  </div>

<script src="script.js" charset="utf-8"></script>
  </body>
</html>
