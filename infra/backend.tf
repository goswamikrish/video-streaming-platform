terraform {
  backend "s3" {
    bucket         = "newsapp-terraform-state"
    key            = "newsapp/terraform.tfstate"
    region         = "eu-north-1"
    encrypt        = true
    dynamodb_table = "newsapp-terraform-lock"
  }
}
