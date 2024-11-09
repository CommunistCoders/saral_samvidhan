using UnityEngine;
using UnityEngine.SceneManagement;

public class LoadDriverSceneOnSpace : MonoBehaviour
{
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            SceneManager.LoadScene("DriverScene");
        }
    }
}
